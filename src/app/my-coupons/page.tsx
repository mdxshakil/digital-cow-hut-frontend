"use client";
import Container from "@/components/Container";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import useGetUserFromStore from "@/hooks/useGetUserFromStore";
import { useGetMyCouponsQuery } from "@/redux/features/coupon/couponApi";
import { USER_ROLE } from "@/types";
import Loading from "../loading";
import { ICoupon } from "@/types/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MyCouponsPage() {
  //protect route
  const { isLoading } = useAuthCheck(USER_ROLE.BUYER);
  const { userId } = useGetUserFromStore();
  const {
    data: coupons,
    isLoading: couponLoading,
    isError,
    error,
  } = useGetMyCouponsQuery(userId);

  // Function to handle copy button click
  const handleCopyClick = (couponCode: string) => {
    navigator.clipboard.writeText(couponCode);
    toast.success("Coupon copied to clipboard");
  };

  if (isLoading) {
    return <Loading />;
  }

  //decide what to render
  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (!couponLoading && isError) {
    content = <p className="text-center">An error occured</p>;
  } else if (!couponLoading && !isError && coupons?.data?.length === 0) {
    content = <p className="text-center">No coupons available</p>;
  } else if (!couponLoading && !isError && coupons?.data?.length > 0) {
    content = (
      <TableBody>
        {coupons?.data?.map((coupon: ICoupon) => (
          <TableRow key={coupon._id}>
            <TableCell className="text-primary">{coupon.couponCode}</TableCell>
            <TableCell>{coupon.discountAmount}%</TableCell>
            <TableCell>
              <Copy
                size={16}
                className="cursor-pointer"
                onClick={() => handleCopyClick(coupon.couponCode)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  return (
    <Container>
      <div className="mt-12">
        <h1 className="text-center text-2xl mb-6">My Coupons</h1>
        <div>
          <Table>
            <TableCaption>A list of all the claimed coupons.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Coupon Code</TableHead>
                <TableHead>Discount(%)</TableHead>
                <TableHead>Copy</TableHead>
              </TableRow>
            </TableHeader>
            {content}
          </Table>
        </div>
      </div>
    </Container>
  );
}
