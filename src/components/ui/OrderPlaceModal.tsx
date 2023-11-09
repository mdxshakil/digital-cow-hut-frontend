"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useGetUserFromStore from "@/hooks/useGetUserFromStore";
import { usePlaceOrderMutation } from "@/redux/features/order/orderApi";
import { ICow } from "@/types/types";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { AvatarFallback, AvatarImage, Avatar } from "./avatar";
import toast from "react-hot-toast";

type IProps = {
  cow: ICow;
};

const OrderPlaceModal = ({ cow }: IProps) => {
  const [placeOrder, { data }] = usePlaceOrderMutation();
  const { userId } = useGetUserFromStore();
  const [shippingAddress, setShippingAddress] = useState("");
  const [contactNo, setContactNo] = useState("");

  const handlePlaceOrder = async () => {
    placeOrder({
      shippingAddress: shippingAddress,
      contactNo: contactNo,
      cow: cow._id,
      buyer: userId,
    });
    toast("Please wait while your request being processed!", {
      icon: "⌛",
    });
  };

  //redirect to payment page
  useEffect(() => {
    if (!!data?.data?.redirectURL) {
      redirect(data?.data?.redirectURL);
    }
  }, [data?.data?.redirectURL]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"sm"}>Buy Now</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm your order</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex items-center gap-3 mb-3">
              <Avatar>
                <AvatarImage src={cow.image} alt={cow.name} />
                <AvatarFallback className="italic text-sm">
                  {cow.name}
                </AvatarFallback>
              </Avatar>
              <p>Price:{cow.price}</p>
            </div>
          </AlertDialogDescription>
          <div className="grid gap-y-3">
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
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlePlaceOrder}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OrderPlaceModal;
