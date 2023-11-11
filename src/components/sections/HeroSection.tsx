import React from "react";
import { Separator } from "../ui/separator";

export default function HeroSection() {
  return (
    <div className="overflow-hidden">
      <div
        style={{ backgroundImage: `url(/img/hero-bg.jpg)` }}
        className="relative aspect-video overflow-hidden bg-cover"
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8 ">
          <div className="font-bold text-xl sm:text-5xl lg:text-6xl mx-0 md:mx-12 dark:text-secondary bg-white/60 p-4 rounded-lg">
            Your premier destination for cattle excellence
          </div>
        </div>
      </div>
    </div>
  );
}
