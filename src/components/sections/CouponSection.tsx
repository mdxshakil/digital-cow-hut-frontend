import { useGetAllCouponQuery } from "@/redux/features/coupon/couponApi";
import Container from "../Container";
import CouponCard from "../CouponCard";
import { ICoupon } from "@/types/types";
import Loading from "@/app/loading";
import useGetUserFromStore from "@/hooks/useGetUserFromStore";

export default function CouponSection() {
  const { data: coupons, isLoading, isError } = useGetAllCouponQuery(undefined);
  const { role, userId } = useGetUserFromStore();

  //decide what to render
  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <p className="text-center">An error occured</p>;
  } else if (!isLoading && !isError && coupons?.data?.length === 0) {
    content = <p className="text-center">No coupons available</p>;
  } else if (!isLoading && !isError && coupons?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {coupons?.data?.map((coupon: ICoupon) => (
          <CouponCard
            key={coupon._id}
            coupon={coupon}
            role={role}
            userId={userId}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="py-12 md:py-24">
      <div className="mb-12 md:mb-20">
        <h2 className="text-center text-4xl tracking-wider">
          Grab coupons before they are out
        </h2>
        <p className="text-center">Only for buyers</p>
      </div>
      <Container>{content}</Container>
    </div>
  );
}
