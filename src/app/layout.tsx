import "./globals.css";
import type { Metadata } from "next";
// import Providers from "./Providers";
import { Poiret_One, Manrope } from "next/font/google";
import Providers from "./Providers";
import ActivityLogger from "./ActivityLogger";

const poiret_one = Poiret_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poiret-one",
});
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Moulik Budhiraja",
  description:
    "Hi, I'm Moulik. I'm an enthusiastic Software Engineering student at the University of Guelph who is passionate about math, technology and photography. This is my personal website and blog.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poiret_one.variable} ${manrope.variable}`}>
      <body
        className={`${manrope.className} text-neutral-400 bg-neutral-850 p-8 overflow-x-hidden`}
      >
        <Providers>
          <div
            className={`fixed w-[175vh] h-60 lg:h-72 2xl:h-96 bg-neutral-300 rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none top-[0] left-[10vw] rotate-[60deg] -z-50`}
          ></div>
          <div
            className={`fixed w-[175vh] h-60 lg:h-72 2xl:h-96 bg-neutral-300 rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none top-[140vh] left-[80vw] rotate-[120deg] -z-50`}
          ></div>
          {children}

          <ActivityLogger></ActivityLogger>
        </Providers>
      </body>
    </html>
  );
}
