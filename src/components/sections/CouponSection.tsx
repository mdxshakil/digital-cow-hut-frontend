import Container from "../Container";
import CouponCard from "../CouponCard";

export default function CouponSection() {
  return (
    <div className="py-12 md:py-24">
      <h2 className="text-center text-4xl tracking-wider mb-12 md:mb-20">
        Grab coupons before they are out
      </h2>
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
        </div>
      </Container>
    </div>
  );
}
