import { db } from "@/Firebase/config";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { redirect } from "next/navigation";
import LoadMore from "./LoadMore";

export const revalidate = 5;

const getData = async (Product, Gender) => {
  let Data = [];
  const q = query(
    collection(db, `${Product}${Gender}`),
    limit(3),
    orderBy("createdAt", "desc")
  );
  await getDocs(q).then((data) =>
    data.docs.map((g) => Data.push({ ...g.data(), id: g.id }))
  );
  return Data;
};

export default async function ProductPage({ params }) {
  const UrlParams = params.prod;

  // Main Check
  try {
    UrlParams[0];
  } catch {
    redirect("/");
  }

  const ProductType = UrlParams[0];
  const Gender = UrlParams[1];

  // Check 1 (ProductType)
  ProductType !== "Dress" &&
    ProductType !== "Shoe" &&
    ProductType !== "Accessories" &&
    redirect("/");

  // Check 2 (Gender)
  Gender !== "Men" &&
    Gender !== "Women" &&
    redirect(`/Products/${ProductType}/Men`);

  // Check 3 (Removing extra unwanted Params )
  UrlParams.length > 2 && redirect(`/Products/${ProductType}/${Gender}`);

  const Products = await getData(ProductType, Gender);
  return (
    <main className="grid w-full gap-10  place-items-center">
      <div className="grid w-11/12 place-items-center h-80">
        <h1 className="mr-auto mb-6 ml-[5%] text-4xl">
          {`
            ${ProductType === "Dress" ? "Clothing" : ProductType} 
            ${Gender}
          `}
        </h1>
        <LoadMore Data={Products} Gender={Gender} ProductType={ProductType} />
      </div>
    </main>
  );
}
