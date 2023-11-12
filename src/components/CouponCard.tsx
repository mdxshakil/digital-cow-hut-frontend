import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { ICoupon } from "@/types/types";
import { USER_ROLE } from "@/types";
import { useClaimCouponMutation } from "@/redux/features/coupon/couponApi";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

type IProps = {
  coupon: ICoupon;
  role: string;
  userId: string;
};

export default function CouponCard({ coupon, role, userId }: IProps) {
  const { discountAmount, _id } = coupon || {};
  const [claimCoupon, { isLoading, isError, error, isSuccess }] =
    useClaimCouponMutation();

  const handleCouponClaim = (couponId: string) => {
    if (!userId) {
      redirect("/login");
    }
    claimCoupon({ couponId, userId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Coupon claimed");
    }
    if (isError) {
      toast.error((error as any)?.data.message || "An error occured");
    }
  }, [error, isSuccess, isError]);

  return (
    <Card className="hover:bg-secondary bg-primary transition-all duration-500 group">
      <CardHeader className="pt-3 pb-0">
        <CardTitle className="text-center">COUPON</CardTitle>
      </CardHeader>
      <CardContent className="text-center pb-3">
        <div className="flex justify-center gap-1">
          <h1 className="text-4xl md:text-6xl font-bold text-secondary group-hover:text-primary">
            {discountAmount}
          </h1>
          <p className="flex flex-col text-start">
            <span className="text-xl md:text-2xl font-bold">%</span>
            <span className="text-lg md:text-xl font-bold">OFF</span>
          </p>
        </div>
        <p className="text-sm">Limited Stock</p>
      </CardContent>
      {role === USER_ROLE.BUYER && (
        <CardFooter>
          <Button
            size={"xs"}
            variant={"secondary"}
            className="mx-auto px-6"
            onClick={() => handleCouponClaim(_id)}
            disabled={isLoading}
          >
            Claim
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
