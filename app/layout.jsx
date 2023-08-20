import "./globals.css";
import { Inter } from "next/font/google";
import Combined from "@/components/Combined";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tozito",
  description:
    "Tozito, your all in one quality dress, shoe and accessorie's shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Combined />
        <div className="grid min-h-screen py-32 place-items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
