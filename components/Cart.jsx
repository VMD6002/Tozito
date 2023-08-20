"use client";
import { Bucket, Bucket2, Loading } from "@/app/_data/Bucket";
import { BsFillBagFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/Firebase/config";

export default function Cart({ OpenCart, setOpenCart }) {
  const [CartIds, setCartIds] = useAtom(Bucket);
  const [Loding, setLoding] = useAtom(Loading);
  const [CartItems, setCartItems] = useAtom(Bucket2);
  useEffect(() => {
    setLoding(() => true);
    let Prods = [];
    CartIds.map(
      async (e) =>
        await getDoc(
          doc(db, `${e.Type}${e.Gender}`, e.Id, `${e.Gender}DressData`, e.Color)
        ).then((data) => Prods.push({ ...data.data() }))
    );
    setCartItems(Prods);
    setLoding(() => false);
  }, [CartIds]);
  return (
    <div
      className={
        "fixed z-10 inset-0 bg-white/50 backdrop-blur-sm transition-transform min-h-screen " +
        (OpenCart && "translate-x-[100%]")
      }
    >
      <div className="w-full h-full ml-auto text-xl bg-white sm:w-3/4 md:w-2/4">
        <div className="flex items-center justify-between">
          <div className="px-5 py-4 ">
            <BsFillBagFill />
          </div>
          <h1>Cart</h1>
          <button onClick={() => setOpenCart((g) => !g)} className="px-5 py-4">
            <GrClose />
          </button>
        </div>
        <div className="text-lg space-y-3">
          {CartItems.map((e, i) => (
            <div
              key={`Cart_Item_${i}`}
              className="flex h-[4.5rem] w-[93%] m-auto"
            >
              <img
                className="w-1/4 object-contain object-center rounded-md"
                src={e.images[0]}
              />
              <div className="pl-5 py-1">
                <h1>{e.ProductName}</h1>
                <p className="text-sm text-gray-400">{e.Name}</p>
              </div>
              <div className="px-5 mx-auto py-1">
                <h1>
                  {
                    e.Sizes.filter((j) => j.Name == CartIds[i]?.Size)[0]?.Price
                      .OFFER
                  }
                </h1>
              </div>
            </div>
          ))}
          {Loding && (
            <>
              <div className="flex h-[4rem] w-[92%] m-auto bg-neutral-100 animate-pulse" />
              <div className="flex h-[4rem] w-[92%] m-auto bg-neutral-100 animate-pulse" />
              <div className="flex h-[4rem] w-[92%] m-auto bg-neutral-100 animate-pulse" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
