import SkProduct from "./SkProduct";

export default async function ProductPage() {
  return (
    <main className="grid w-full gap-10  place-items-center">
      <div className="grid w-11/12 place-items-center h-80">
        <h1 className="mr-auto mb-6 ml-[5%] blur-md animate-pulse border-black text-4xl border-b-2">
          Product Name
        </h1>
        <div className="grid w-full sm:grid-cols-2 lg:grid-cols-3 h-80">
          <SkProduct />
          <SkProduct />
          <SkProduct />
        </div>
      </div>
    </main>
  );
}
