"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsBag } from "react-icons/bs";
// import { FiUser } from "react-icons/fi";

const NavDefault = { Dress: false, Shoe: false, Acc: false };

export default function NavMobile({ setOpenCart }) {
  const [NavState, setNavState] = useState(NavDefault);
  const [Scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ScrollNow = window.scrollY;
    window.onscroll = () => {
      ScrollNow < window.scrollY ? setScrolled(true) : setScrolled(false);
      ScrollNow = window.scrollY;
    };
  }, []);

  return (
    <nav className="fixed z-10 w-full">
      <div className="relative flex justify-between w-full px-[5%] py-4 m-auto text-xs bg-white">
        <h1>{"'_'"}</h1>
        {/* <FiUser className="text-2xl" /> */}
        <div className="absolute inset-0 py-2 m-auto text-3xl w-fit">
          <Link href="/" prefetch={false}>
            TOZITO
          </Link>
        </div>
        <button onClick={() => setOpenCart((g) => !g)}>
          <BsBag className="mb-1 text-lg" />
        </button>
      </div>

      <div
        className={
          "fixed transition-transform inset-0 bg-opacity-20 backdrop-blur-md mb-[2.5rem] mt-14  " +
          (NavState.Shoe ? "translate-y-0" : "translate-y-[120%]")
        }
      >
        <div className="grid flex-col w-11/12 h-full px-3 m-auto overflow-hidden text-3xl place-items-center">
          <div className="space-y-4">
            <h1 className="mb-10 text-4xl border-b-2 border-black">Shoes</h1>
            <h1>
              <Link
                onClick={() =>
                  setNavState((g) => ({
                    Dress: false,
                    Shoe: !g.Shoe,
                    Acc: false,
                  }))
                }
                prefetch={false}
                href={"/Products/Shoe/Men"}
              >
                Men
              </Link>
            </h1>
            <h1>
              <Link
                onClick={() =>
                  setNavState((g) => ({
                    Dress: false,
                    Shoe: !g.Shoe,
                    Acc: false,
                  }))
                }
                prefetch={false}
                href={"/Products/Shoe/Women"}
              >
                Women
              </Link>
            </h1>
          </div>
        </div>
      </div>

      <div
        className={
          "fixed transition-transform inset-0 bg-opacity-20 backdrop-blur-md mb-[2.5rem] mt-14  " +
          (NavState.Dress ? "translate-y-0" : "translate-y-[120%]")
        }
      >
        <div className="grid flex-col w-11/12 h-full px-3 m-auto overflow-hidden text-3xl place-items-center">
          <div className="space-y-4">
            <h1 className="mb-10 text-4xl border-b-2 border-black">Clothing</h1>
            <h1>
              <Link
                onClick={() =>
                  setNavState((g) => ({
                    Dress: !g.Dress,
                    Shoe: false,
                    Acc: false,
                  }))
                }
                prefetch={false}
                href={"/Products/Dress/Men"}
              >
                Men
              </Link>
            </h1>
            <h1>
              <Link
                onClick={() =>
                  setNavState((g) => ({
                    Dress: !g.Dress,
                    Shoe: false,
                    Acc: false,
                  }))
                }
                prefetch={false}
                href={"/Products/Dress/Women"}
              >
                Women
              </Link>
            </h1>
          </div>
        </div>
      </div>

      <div
        className={
          "fixed transition-transform inset-0 bg-opacity-20 backdrop-blur-md mb-[2.5rem] mt-14  " +
          (NavState.Acc ? "translate-y-0" : "translate-y-[120%]")
        }
      >
        <div className="grid flex-col w-11/12 h-full px-3 m-auto overflow-hidden text-3xl place-items-center">
          <div className="space-y-4">
            <h1 className="mb-10 text-4xl border-b-2 border-black">
              Accessories
            </h1>
            <h1>
              <Link
                onClick={() =>
                  setNavState((g) => ({
                    Dress: false,
                    Shoe: false,
                    Acc: !g.Acc,
                  }))
                }
                prefetch={false}
                href={"/Products/Accessories/Men"}
              >
                Men
              </Link>
            </h1>
            <h1>
              <Link
                onClick={() =>
                  setNavState((g) => ({
                    Dress: false,
                    Shoe: false,
                    Acc: !g.Acc,
                  }))
                }
                prefetch={false}
                href={"/Products/Accessories/Women"}
              >
                Women
              </Link>
            </h1>
          </div>
        </div>
      </div>

      <div
        className={
          "fixed py-3 px-[5%] transition-transform font-serif inset-0 bg-neutral-400 bg-opacity-40 backdrop-blur-md flex justify-between mt-auto h-fit " +
          (Scrolled && "translate-y-[120%]")
        }
      >
        <button
          className={NavState.Shoe && "border-b-2 border-black"}
          onClick={() =>
            setNavState((g) => ({ Dress: false, Shoe: !g.Shoe, Acc: false }))
          }
        >
          Shoe
        </button>
        <button
          className={NavState.Acc && "border-b-2 border-black"}
          onClick={() =>
            setNavState((g) => ({ Dress: false, Shoe: false, Acc: !g.Acc }))
          }
        >
          Accessories
        </button>
        <button
          className={NavState.Dress && "border-b-2 border-black"}
          onClick={() =>
            setNavState((g) => ({ Dress: !g.Dress, Shoe: false, Acc: false }))
          }
        >
          Clothing
        </button>
      </div>
    </nav>
  );
}
