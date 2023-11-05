import React from "react";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="overflow-hidden">
      <div
        style={{ backgroundImage: `url(/img/hero-bg.jpg)` }}
        className="relative aspect-video overflow-hidden bg-cover"
      >
        <div className="h-full w-full md:flex flex-col justify-center items-center text-center gap-y-8 hidden">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs dark:text-secondary bg-white/60 p-4 rounded-lg">
            Cows That Steal the Show
            <Button size={"lg"} className="w-full py-6 text-xl">
              <ShoppingBag className="mr-2" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
