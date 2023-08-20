"use client";
import { useState } from "react";
import Cart from "./Cart";
import NavDesk from "./Nav/NavDesk";
import NavMobile from "./Nav/NavMobile";

export default function Combined() {
  const [OpenCart, setOpenCart] = useState(true);
  return (
    <>
      <div className="hidden sm:block">
        <NavDesk setOpenCart={setOpenCart} />
      </div>
      <div className="sm:hidden">
        <NavMobile setOpenCart={setOpenCart} />
      </div>
      <Cart OpenCart={OpenCart} setOpenCart={setOpenCart} />
    </>
  );
}
