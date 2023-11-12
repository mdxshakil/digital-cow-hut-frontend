import { useGetAllCouponQuery } from "@/redux/features/coupon/couponApi";
import Container from "../Container";
import CouponCard from "../CouponCard";
import { ICoupon } from "@/types/types";
import Loading from "@/app/loading";

export default function CouponSection() {
  const { data: coupons, isLoading, isError } = useGetAllCouponQuery(undefined);

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
          <CouponCard key={coupon._id} coupon={coupon} />
        ))}
      </div>
    );
  }

  return (
    <div className="py-12 md:py-24">
      <h2 className="text-center text-4xl tracking-wider mb-12 md:mb-20">
        Grab coupons before they are out
      </h2>
      <Container>{content}</Container>
    </div>
  );
}
