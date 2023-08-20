import Link from "next/link";

export default function Product({ img, Name, Price, AvaColors, Href }) {
  return (
    <Link
      href={Href}
      key={Name}
      className="m-auto cursor-pointer snap-center w-11/12"
    >
      <div className="relative -z-10">
        <div className="absolute bottom-0 right-0 top-auto left-auto flex py-2 pr-11">
          {AvaColors.map((f, i) => (
            <div key={i} className="w-[0.9rem] ">
              <div
                style={{ backgroundColor: f.Color }}
                className="h-4 rounded-full border-[1px] border-black aspect-square"
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
}
