"use client";
import Container from "@/components/Container";
import CouponModal from "@/components/ui/CouponModal";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { USER_ROLE } from "@/types";
import Loading from "../loading";
import {
  useDeleteCouponMutation,
  useGetAllCouponQuery,
} from "@/redux/features/coupon/couponApi";
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
import DeleteModal from "@/components/ui/DeleteModal";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ManageCouponsPage() {
  // protect route
  const { isLoading } = useAuthCheck(USER_ROLE.ADMIN);
  const {
    data: coupons,
    isLoading: couponLoading,
    isError,
  } = useGetAllCouponQuery(undefined);
  const [deleteCoupon, deleteStatus] = useDeleteCouponMutation();

  const handleCouponDelete = (couponId: string) => {
    deleteCoupon(couponId);
  };

  useEffect(() => {
    if (deleteStatus.isSuccess) {
      toast.success("Coupon deleted");
    }
    if (deleteStatus.isError) {
      toast.error(
        (deleteStatus.error as any)?.data.message || "An error occured"
      );
    }
  }, [deleteStatus]);

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
            <TableCell>{coupon.couponStock}</TableCell>
            <TableCell>
              <DeleteModal
                actionFn={() => handleCouponDelete(coupon._id)}
                message="Are you sure to delete this coupon?"
                isLoading={deleteStatus.isLoading}
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
        <div>
          <CouponModal />
          <div className="mt-6">
            <Table>
              <TableCaption>A list of all the available coupons.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Coupon Code</TableHead>
                  <TableHead>Discount(%)</TableHead>
                  <TableHead>Stock Left</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              {content}
            </Table>
          </div>
        </div>
      </div>
    </Container>
  );
}
