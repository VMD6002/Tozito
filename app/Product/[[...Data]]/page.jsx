import { redirect } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/Firebase/config";
import ProductCard from "../ProductCard";

const getData = async (Product, Gender, id, Color) => {
  let Data;
  let docRef = doc(db, `${Product}${Gender}`, id);
  Color
    ? ((docRef = doc(
        db,
        `${Product}${Gender}`,
        id,
        `${Gender}DressData`,
        Color
      )),
      await getDoc(docRef).then((data) =>
        data.exists()
          ? (Data = { ...data.data() })
          : redirect(`/Product/${Product}/${Gender}/${id}`)
      ))
    : await getDoc(docRef).then((data) =>
        data.exists()
          ? (Data = { ...data.data() })
          : redirect(`/Products/${Product}/${Gender}`)
      );
  return Data;
};

export default async function ProductId({ params }) {
  const UrlParams = params.Data;

  // Check 0
  try {
    UrlParams[0];
  } catch {
    redirect("/");
  }

  const ProductType = UrlParams[0];
  const Gender = UrlParams[1];
  const ProductId = UrlParams[2];
  const ProductColor = UrlParams[3];

  // Check 1 (ProductType)
  ProductType !== "Dress" &&
    ProductType !== "Shoe" &&
    ProductType !== "Accessories" &&
    redirect("/");

  // Check 2 (Gender)
  Gender !== "Men" &&
    Gender !== "Women" &&
    redirect(`/Products/${ProductType}/Men`);

  // Check 3 (Checking if there is any id)
  !ProductId && redirect(`/Products/${ProductType}/${Gender}`);

  UrlParams.length > 4 &&
    redirect(`/Product/${ProductType}/${Gender}/${ProductId}/${ProductColor}`);

  const Data = await getData(ProductType, Gender, ProductId, ProductColor);

  return (
    <ProductCard
      Data={Data}
      Tree={{ Type: ProductType, Gender: Gender, Id: ProductId }}
    />
  );
}
