"use client"
import Container from "@/components/Container";
import CouponModal from "@/components/ui/CouponModal";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { USER_ROLE } from "@/types";
import Loading from "../loading";

export default function ManageCouponsPage() {
  const { isLoading } = useAuthCheck(USER_ROLE.ADMIN);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="mt-12">
        <div>
          <CouponModal />
          <div></div>
        </div>
      </div>
    </Container>
  );
}
