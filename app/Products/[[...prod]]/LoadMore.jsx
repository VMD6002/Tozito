"use client";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import SkProduct from "../SkProduct";
import Product from "../Product";
import { Suspense } from "react";
import { db } from "@/Firebase/config";

export default function LoadMore({ Data, ProductType, Gender }) {
  const [Products, setProducts] = useState(Data);
  const [end, setEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  const LoadMoreData = async (n) => {
    setLoading(true);
    const Last = Products.slice(-1)[0];
    if (!Last) {
      setEnd(true);
      setLoading(false);
      return;
    }
    const StartAfter = new Date(
      Last.createdAt.seconds * 1000 + Last.createdAt.nanoseconds / 1000000
    );
    const q = query(
      collection(db, `${ProductType}${Gender}`),
      orderBy("createdAt", "desc"),
      startAfter(StartAfter),
      limit(n)
    );
    const newProds = await getDocs(q).then((data) =>
      data.docs.map((g) => ({ ...g.data(), id: g.id }))
    );
    if (newProds.length <= n) {
      setLoading(false);
      setEnd(true);
    }
    setLoading(false);
    setProducts((v) => [...v, ...newProds]);
  };

  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          LoadMoreData(3);
        }
      },
      { threshold: 0.4 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);
  return (
    <div className="grid w-full sm:grid-cols-2 lg:grid-cols-3 h-80">
      {Products.map((g, f) => (
        <Suspense key={f} fallback={<SkProduct />}>
          <Product
            Href={`/Product/${ProductType}/${Gender}/${g.id}`}
            img={g.images[0] || ""}
            Name={g.ProductName}
            Price={{
              OFFER: g.Sizes[0].Price.OFFER,
              OG: g.Sizes[0].Price.OG,
            }}
            AvaColors={g.AvaColors}
            Color={g.Color}
          />
        </Suspense>
      ))}
      {!end && loading && (
        <>
          <SkProduct />
          <SkProduct />
          <SkProduct />
        </>
      )}
      {!loading && !end && <div ref={observerTarget} className="h-80 w-full" />}
      {end && Products.length > 0 && (
        <div className="h-80 text-center grid place-items-center">
          <h1 className="border-b-2 text-neutral-400">
            Thats all the products
          </h1>
        </div>
      )}
      {!Products.length && (
        <div className="h-80 text-center grid place-items-center">
          <h1 className="border-b-2 text-neutral-400">No Products Yet</h1>
        </div>
      )}
    </div>
  );
}
