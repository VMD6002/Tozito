"use client";
import Link from "next/link";
import ImageCarousel from "./Carousel";
import { useState } from "react";
import { Bucket, Loading } from "../_data/Bucket";
import { useAtom, useSetAtom } from "jotai";

export default function ProductCard({ Data, Tree }) {
  const [Cart, setCart] = useAtom(Bucket);
  const setLoding = useSetAtom(Loading);
  const Images = Data.images;
  const Sizes = Data.Sizes;
  const Colors = Data.AvaColors;
  const Name = Data.ProductName;
  const Description = Data.Descriptiosn;
  const [CurrentSize, setCurrentSize] = useState(0);
  const Price = Sizes[CurrentSize].Price.OFFER;
  return (
    <div className="max-w-xl min-h-screen w-11/12">
      <ImageCarousel>
        {Images?.map((i, d) => (
          <div
            key={`Product-Image-${d}`}
            className="h-[20rem] bg-cover"
            style={{
              backgroundImage: `url(${i})`,
            }}
            data-value="1"
          >
            <div className="w-full h-full grid place-items-center bg-white/10 backdrop-blur-lg">
              <img className="h-[19rem] rounded-lg shadow-md" src={i} />
            </div>
          </div>
        ))}
      </ImageCarousel>
      <h1 className="font-bold pt-6 text-3xl">{Name}</h1>
      <h1 className="font-semibold text-xl text-gray-700">{Price}</h1>
      <div className="pt-6">
        <h3 className="text-sm ml-[0.15rem]">Color</h3>
        <div className="pt-4 flex space-x-3">
          {Colors.map((i, d) => (
            <Link
              key={`Color-${d}`}
              href={`/${Tree.Type}/${Tree.Gender}/${Tree.Id}/${i.Name}`}
              style={{ backgroundColor: i.Color }}
              className={
                "w-8 ring-gray-400 aspect-square rounded-full border-[1.2px] border-gray-300 " +
                (i.Color === Data.Color && "ring-2 ring-offset-2")
              }
            />
          ))}
        </div>
      </div>
      {Sizes && (
        <div className="pt-8">
          <h3 className="text-sm ml-[0.15rem]">Size</h3>
          <div className="pt-4 text-xs flex space-x-3">
            {Sizes.map((i, d) => (
              <button
                key={`Size-${d}`}
                onClick={() => setCurrentSize(d)}
                type="button"
                style={{ backgroundColor: "white" }}
                className={
                  "w-16 text-center py-6 rounded-md uppercase border-2 " +
                  (d === CurrentSize && "border-neutral-600")
                }
              >
                {i.Name}
              </button>
            ))}
          </div>
        </div>
      )}
      {Cart.find((val) => val.Id === Tree.Id && val.Color === Data.Name) ? (
        <button
          onClick={() => setCart(() => Cart.filter((l) => l.Id !== Tree.Id))}
          className="w-full rounded-md mx-auto grid mt-10 bg-neutral-400 text-white tracking-tighter py-2"
        >
          Remove from Bag
        </button>
      ) : (
        <button
          type="button"
          onClick={() =>
            setCart(() => [
              ...Cart,
              {
                ...Tree,
                Quantity: 1,
                Color: Data.Name,
                Size: Sizes[CurrentSize].Name,
              },
            ])
          }
          className="w-full rounded-md mx-auto grid mt-10 bg-neutral-600 text-white tracking-tighter py-2"
        >
          Add to bag
        </button>
      )}
      <h5 className="pt-10 text-sm">Details</h5>
      <p className="text-xs pt-3 text-gray-700">{Description}</p>
      <button onClick={() => console.log(Cart)}>Jahka</button>
    </div>
  );
}
