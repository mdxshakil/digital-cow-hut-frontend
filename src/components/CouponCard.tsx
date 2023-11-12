import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { ICoupon } from "@/types/types";

export default function CouponCard({ coupon }: { coupon: ICoupon }) {
  const { discountAmount } = coupon || {};
  return (
    <Card className="hover:bg-primary transition-all duration-500 group">
      <CardHeader className="pt-3 pb-0">
        <CardTitle className="text-center">COUPON</CardTitle>
      </CardHeader>
      <CardContent className="text-center pb-3">
        <div className="flex justify-center gap-1">
          <h1 className="text-4xl md:text-6xl font-bold text-primary group-hover:text-secondary">
            {discountAmount}
          </h1>
          <p className="flex flex-col text-start">
            <span className="text-xl md:text-2xl font-bold">%</span>
            <span className="text-lg md:text-xl font-bold">OFF</span>
          </p>
        </div>
        <p className="text-sm">Limited Stock</p>
      </CardContent>
      <CardFooter>
        <Button size={"xs"} variant={"secondary"} className="mx-auto px-6">
          Claim
        </Button>
      </CardFooter>
    </Card>
  );
}
