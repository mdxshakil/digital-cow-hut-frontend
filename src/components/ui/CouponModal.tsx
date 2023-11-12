"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddNewCouponMutation } from "@/redux/features/coupon/couponApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CouponModal() {
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<number>();
  const [couponStock, setCouponStock] = useState<number>();
  const [addNewCoupon, { isLoading, isError, isSuccess, error }] =
    useAddNewCouponMutation();

  const handleCouponCreate = () => {
    addNewCoupon({ couponCode, discountAmount, couponStock });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("New coupon added");
    }
    if (isError) {
      toast.error((error as any)?.data.message || "There was an error");
    }
  }, [error, isError, isSuccess]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add new coupon</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new coupon</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="couponCode">CouponCode</Label>
            <Input
              id="couponCode"
              value={couponCode}
              className="mt-2"
              onChange={(e) => setCouponCode(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="discountAmount">Discount amount(%)</Label>
            <Input
              id="discountAmount"
              value={discountAmount}
              className="mt-2"
              onChange={(e) => setDiscountAmount(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="couponStock">Coupon Stock</Label>
            <Input
              id="couponStock"
              value={couponStock}
              className="mt-2"
              onChange={(e) => setCouponStock(Number(e.target.value))}
            />
          </div>
        </div>
        <DialogFooter>
          {isLoading ? (
            <Button disabled>Please wait...</Button>
          ) : (
            <Button onClick={handleCouponCreate}>Submit</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
