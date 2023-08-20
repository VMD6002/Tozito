import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/Firebase/config";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

// Specific Component Used only for this page
const Product = ({ img, Name, Price, AvaColors, Href }) => (
  <Link
    prefetch={false}
    href={Href}
    key={Name}
    className="m-auto cursor-pointer snap-center w-60"
  >
    <div className="relative -z-10">
      <div className="absolute bottom-0 right-0 top-auto left-auto flex py-2 pr-11">
        {AvaColors.map((f, i) => (
          <div key={i} className="w-[0.9rem] ">
            <div
              style={{ backgroundColor: f.Color }}
              className="h-4 rounded-full border-[1px] aspect-square"
            />
          </div>
        ))}
      </div>
      <img
        className="object-contain w-full m-auto bg-opacity-25 h-full aspect-square"
        src={img}
        alt="Dress"
      />
    </div>
    <div className="w-11/12 h-24 p-2 space-y-1">
      <h1 className="text-lg font-medium">{Name}</h1>
      <div className="flex justify-between">
        <div className="flex font-serif">
          <h4 className="text-sm">{Price.OFFER}</h4>
          <strike className="ml-1 text-xs text-gray-400">{Price.OG}</strike>
        </div>
      </div>
    </div>
  </Link>
);

const SkProduct = () => (
  <div className="m-auto cursor-pointer snap-center w-60 animate-pulse">
    <div className="h-full aspect-square bg-neutral-200 rounded-md blur-sm" />
    <div className="w-11/12 h-24 p-2 space-y-1 blur-sm">
      <h1 className="text-lg font-medium">Phantom Black Dunk</h1>
      <div className="flex justify-between">
        <div className="flex font-serif">
          <h4 className="text-sm">50000</h4>
          <strike className="ml-1 text-xs text-gray-400">90000</strike>
        </div>
      </div>
    </div>
  </div>
);

const getData = async () => {
  let Data = {
    DressMen: [],
    ShoeMen: [],
    AccessoriesMen: [],
    DressWomen: [],
    ShoeWomen: [],
    AccessoriesWomen: [],
  };
  const MDQ = query(
    collection(db, "DressMen"),
    limit(3),
    orderBy("createdAt", "desc")
  );
  const MSQ = query(
    collection(db, "ShoeMen"),
    limit(3),
    orderBy("createdAt", "desc")
  );
  const MAQ = query(
    collection(db, "AccessoriesMen"),
    limit(3),
    orderBy("createdAt", "desc")
  );
  const WDQ = query(
    collection(db, "DressWomen"),
    limit(3),
    orderBy("createdAt", "desc")
  );
  const WSQ = query(
    collection(db, "ShoeWomen"),
    limit(3),
    orderBy("createdAt", "desc")
  );
  const WAQ = query(
    collection(db, "AccessoriesWomen"),
    limit(3),
    orderBy("createdAt", "desc")
  );
  await getDocs(MDQ).then((data) => {
    let temp = data.docs.map((g) => ({ ...g.data(), id: g.id }));
    Data.DressMen = temp;
  });
  await getDocs(MSQ).then((data) => {
    let temp = data.docs.map((g) => ({ ...g.data(), id: g.id }));
    Data.ShoeMen = temp;
  });
  await getDocs(MAQ).then((data) => {
    let temp = data.docs.map((g) => ({ ...g.data(), id: g.id }));
    Data.AccessoriesMen = temp;
  });
  await getDocs(WDQ).then((data) => {
    let temp = data.docs.map((g) => ({ ...g.data(), id: g.id }));
    Data.DressWomen = temp;
  });
  await getDocs(WSQ).then((data) => {
    let temp = data.docs.map((g) => ({ ...g.data(), id: g.id }));
    Data.ShoeWomen = temp;
  });
  await getDocs(WAQ).then((data) => {
    let temp = data.docs.map((g) => ({ ...g.data(), id: g.id }));
    Data.AccessoriesWomen = temp;
  });
  return Data;
};

export default async function Home() {
  const Data = await getData();
  return (
    <main className="grid w-full gap-10 place-items-center">
      <div className="grid w-11/12 place-items-center">
        <h1 className="mr-auto ml-[5%] text-4xl">Clothing</h1>
        <h3 className="mr-auto ml-[5%] text-2xl mt-4">
          <Link href={"/Products/Dress/Men"} prefetch={false}>
            Men {"->"}
          </Link>
        </h3>
        <div className="grid w-full grid-flow-col overflow-x-auto min-h-[20rem] snap-x">
          {!Data.DressMen.length && (
            <div className="m-auto">No product Yet</div>
          )}
          {Data.DressMen.map((g, f) => (
            <Suspense
              key={f}
              fallback={
                <>
                  <SkProduct />
                  <SkProduct />
                  <SkProduct />{" "}
                </>
              }
            >
              <Product
                Href={`/Product/Dress/Men/${g.id}`}
                img={g.images[0]}
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
        </div>
        <h3 className="mr-auto ml-[5%] text-2xl mt-4">
          <Link href={"/Products/Dress/Women"} prefetch={false}>
            Women {"->"}
          </Link>
        </h3>
        <div className="grid w-full grid-flow-col overflow-x-auto min-h-[20rem] snap-x">
          {!Data.DressWomen.length && (
            <div className="m-auto">No product Yet</div>
          )}
          {Data.DressWomen.map((g, f) => (
            <Suspense
              key={f}
              fallback={
                <>
                  <SkProduct />
                  <SkProduct />
                  <SkProduct />{" "}
                </>
              }
            >
              <Product
                Href={`/Product/Dress/Women/${g.id}`}
                img={g.images[0]}
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
        </div>
        <h1 className="mr-auto ml-[5%] text-4xl">Shoes</h1>
        <h3 className="mr-auto ml-[5%] text-2xl mt-4">
          <Link href={"/Products/Shoe/Men"} prefetch={false}>
            Men {"->"}
          </Link>
        </h3>
        <div className="grid w-full grid-flow-col overflow-x-auto min-h-[20rem] snap-x">
          {!Data.ShoeMen.length && <div className="m-auto">No product Yet</div>}
          {Data.ShoeMen.map((g, f) => (
            <Suspense
              key={f}
              fallback={
                <>
                  <SkProduct />
                  <SkProduct />
                  <SkProduct />{" "}
                </>
              }
            >
              <Product
                Href={`/Product/Shoe/Men/${g.id}`}
                img={g.images[0]}
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
        </div>
        <h3 className="mr-auto ml-[5%] text-2xl mt-4">
          <Link href={"/Products/Shoe/Women"} prefetch={false}>
            Women {"->"}
          </Link>
        </h3>
        <div className="grid w-full grid-flow-col overflow-x-auto min-h-[20rem] snap-x">
          {!Data.ShoeWomen.length && (
            <div className="m-auto">No product Yet</div>
          )}
          {Data.ShoeWomen.map((g, f) => (
            <Suspense
              key={f}
              fallback={
                <>
                  <SkProduct />
                  <SkProduct />
                  <SkProduct />{" "}
                </>
              }
            >
              <Product
                Href={`/Product/Shoe/Women/${g.id}`}
                img={g.images[0]}
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
        </div>
        <h1 className="mr-auto ml-[5%] text-4xl">Accessories</h1>
        <h3 className="mr-auto ml-[5%] text-2xl mt-4">
          <Link href={"/Products/Accessories/Men"} prefetch={false}>
            Men {"->"}
          </Link>
        </h3>
        <div className="grid w-full grid-flow-col overflow-x-auto min-h-[20rem] snap-x">
          {!Data.AccessoriesMen.length && (
            <div className="m-auto">No product Yet</div>
          )}
          {Data.AccessoriesMen.map((g, f) => (
            <Suspense
              key={f}
              fallback={
                <>
                  <SkProduct />
                  <SkProduct />
                  <SkProduct />{" "}
                </>
              }
            >
              <Product
                Href={`/Product/Accessories/Men/${g.id}`}
                img={g.images[0]}
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
        </div>
        <h3 className="mr-auto ml-[5%] text-2xl mt-4">
          <Link href={"/Products/Accessories/Women"} prefetch={false}>
            Women {"->"}
          </Link>
        </h3>
        <div className="grid w-full grid-flow-col overflow-x-auto min-h-[20rem] snap-x">
          {!Data.AccessoriesWomen.length && (
            <div className="m-auto">No product Yet</div>
          )}
          {Data.AccessoriesWomen.map((g, f) => (
            <Suspense
              key={f}
              fallback={
                <>
                  <SkProduct />
                  <SkProduct />
                  <SkProduct />{" "}
                </>
              }
            >
              <Product
                Href={`/Product/Accessories/Women/${g.id}`}
                img={g.images[0]}
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
        </div>
      </div>
    </main>
  );
}
