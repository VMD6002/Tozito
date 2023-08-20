export default function SkProduct() {
  return (
    <div className="m-auto cursor-pointer snap-center w-11/12 animate-pulse">
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
}
