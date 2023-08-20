"use client";
import Carousel from "nuka-carousel";

const className = {
  Buton: "w-10 rounded-md font-bold hidden sm:grid",
  Dots: "!p-1 !bg-white/80",
  Contrainer: "px-2",
};

export default function ImageCarousel({ children }) {
  return (
    <Carousel
      defaultControlsConfig={{
        nextButtonText: ">",
        nextButtonClassName: className.Buton,
        prevButtonClassName: className.Buton,
        prevButtonText: "<",
        pagingDotsClassName: className.Dots,
        containerClassName: className.Contrainer,
      }}
      className="rounded-lg"
    >
      {children}
    </Carousel>
  );
}
