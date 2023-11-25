"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useGetUserFromStore from "@/hooks/useGetUserFromStore";
import { usePlaceOrderMutation } from "@/redux/features/order/orderApi";
import { ICoupon, ICow } from "@/types/types";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { AvatarFallback, AvatarImage, Avatar } from "./avatar";
import toast from "react-hot-toast";
import { useGetMyCouponsQuery } from "@/redux/features/coupon/couponApi";

type IProps = {
  cow: ICow;
  btnSize: "icon" | "default" | "sm" | "xs" | "lg" | null | undefined;
  btnChild: string | React.ReactElement | React.ReactNode;
};

const OrderPlaceModal = ({ cow, btnSize, btnChild }: IProps) => {
  const [placeOrder, { data }] = usePlaceOrderMutation();
  const { userId } = useGetUserFromStore();
  const [shippingAddress, setShippingAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState<any>();
  const [finalPrice, setFinalPrice] = useState<number>();
  const { data: coupons } = useGetMyCouponsQuery(userId);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => {
    if (!userId) {
      router.push("/login");
      return
    }
    setOpenModal(true);
  };

  const handlePlaceOrder = async () => {
    placeOrder({
      shippingAddress: shippingAddress,
      contactNo: contactNo,
      cow: cow._id,
      buyer: userId,
      couponId: selectedCoupon && selectedCoupon.split("-")[0],
    });
    toast("Please wait while your request being processed!", {
      icon: "⌛",
    });
  };

  //calculate final price according to the selected coupon
  useEffect(() => {
    if (selectedCoupon) {
      const discountPercentage = Number(selectedCoupon.split("-")[1]);
      const discountedPrice =
        cow.price - (cow.price * discountPercentage) / 100;
      setFinalPrice(Math.ceil(discountedPrice));
    } else {
      // If no coupon selected, use the original price
      setFinalPrice(cow.price);
    }
  }, [selectedCoupon, cow.price]);

  //redirect to payment page
  useEffect(() => {
    if (!!data?.data?.redirectURL) {
      redirect(data?.data?.redirectURL);
    }
  }, [data?.data?.redirectURL]);

  return (
    <AlertDialog open={openModal}>
      <AlertDialogTrigger asChild>
        <Button size={btnSize} variant={"default"} onClick={handleOpenModal}>
          {btnChild}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm your order</AlertDialogTitle>
          <div className="flex items-center gap-3 mb-3">
            <Avatar>
              <AvatarImage src={cow.image} alt={cow.name} />
              <AvatarFallback className="italic text-sm">
                {cow.name}
              </AvatarFallback>
            </Avatar>
            <p>Price:{cow.price}</p>
          </div>
          <div className="grid gap-y-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <select
                value={selectedCoupon}
                onChange={(e) => setSelectedCoupon(e.target.value)}
                className="p-2 bg-transparent border"
              >
                <option
                  selected
                  disabled
                  className="bg-primary text-secondary font-bold"
                >
                  Select coupon
                </option>
                {coupons?.data?.map((coupon: ICoupon) => (
                  <option
                    key={coupon._id}
                    value={coupon._id + "-" + coupon.discountAmount}
                    className="bg-primary text-secondary font-bold"
                  >
                    {coupon.couponCode + " - " + coupon.discountAmount}%
                    discount
                  </option>
                ))}
              </select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="address">Shipping Address</Label>
              <Input
                type="text"
                id="address"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="contact">Contact No</Label>
              <Input
                type="text"
                id="contact"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
              />
            </div>
            <p>Final price: {finalPrice}</p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpenModal(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handlePlaceOrder}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OrderPlaceModal;
