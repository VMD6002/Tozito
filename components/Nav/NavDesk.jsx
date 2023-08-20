"use client";
import Link from "next/link";
import { useState } from "react";

const NavDefault = { Dress: false, Shoe: false, Acc: false };
const Nav1 = { Dress: true, Shoe: false, Acc: false };
const Nav2 = { Dress: false, Shoe: true, Acc: false };
const Nav3 = { Dress: false, Shoe: false, Acc: true };

export default function NavDesk({ setOpenCart }) {
  const [NavState, setNavState] = useState(NavDefault);
  return (
    <nav
      className={
        "fixed w-full z-10 " +
        (Object.values(NavState).includes(true) &&
          "min-h-screen bg-white/10 backdrop-blur-md")
      }
    >
      <div className="relative flex px-[5%] justify-between py-4 m-auto text-xs bg-white">
        <div className="space-x-3 sm:flex">
          <button
            onMouseOver={() => setNavState(Nav1)}
            onClick={() =>
              setNavState({
                Dress: !NavState.Dress,
                Shoe: false,
                Acc: false,
              })
            }
            className={NavState.Dress && "border-b-2 border-black"}
          >
            Clothing
          </button>
          <button
            onMouseOver={() => setNavState(Nav2)}
            onClick={() =>
              setNavState({
                Dress: false,
                Shoe: !NavState.Shoe,
                Acc: false,
              })
            }
            className={NavState.Shoe && "border-b-2 border-black"}
          >
            Shoes
          </button>
          <button
            onMouseOver={() => setNavState(Nav3)}
            onClick={() =>
              setNavState({ Dress: false, Shoe: false, Acc: !NavState.Acc })
            }
            className={NavState.Acc && "border-b-2 border-black"}
          >
            Accessories
          </button>
        </div>
        <div className="absolute inset-0 py-1 m-auto text-4xl w-fit">
          <Link prefetch={false} href="/">
            TOZITO
          </Link>
        </div>
        <div className="px-3 space-x-3 sm:flex">
          <p>{"'_'"}</p>
          <button onClick={() => setOpenCart((g) => !g)}>Bag</button>
        </div>
      </div>
      <div
        onMouseLeave={() => setNavState(NavDefault)}
        className={"wrapper overflow-hidden  " + (NavState.Dress && "is-open")}
      >
        <div className="grid w-11/12 px-3 m-auto overflow-hidden text-lg">
          <h2>
            <Link prefetch={false} href={"/Products/Dress/Men"}>
              Men
            </Link>
          </h2>
          <h2>
            <Link prefetch={false} href={"/Products/Dress/Women"}>
              Women
            </Link>
          </h2>
        </div>
      </div>
      <div
        onMouseLeave={() => setNavState(NavDefault)}
        className={"wrapper overflow-hidden  " + (NavState.Shoe && "is-open")}
      >
        <div className="grid w-11/12 px-3 m-auto overflow-hidden text-lg">
          <h2>
            <Link prefetch={false} href={"/Products/Shoe/Men"}>
              Men
            </Link>
          </h2>
          <h2>
            <Link prefetch={false} href={"/Products/Shoe/Women"}>
              Women
            </Link>
          </h2>
        </div>
      </div>
      <div
        onMouseLeave={() => setNavState(NavDefault)}
        className={"wrapper overflow-hidden  " + (NavState.Acc && "is-open")}
      >
        <div className="grid w-11/12 px-3 m-auto overflow-hidden text-lg">
          <h2>
            <Link prefetch={false} href={"/Products/Accessories/Men"}>
              Men
            </Link>
          </h2>
          <h2>
            <Link prefetch={false} href={"/Products/Accessories/Women"}>
              Women
            </Link>
          </h2>
        </div>
      </div>
      <div
        onMouseOver={() => setNavState(NavDefault)}
        className={
          "absolute w-full " +
          (Object.values(NavState).includes(true) && "h-screen")
        }
      />
    </nav>
  );
}
