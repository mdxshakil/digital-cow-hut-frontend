"use client";
import Container from "@/components/Container";
import CowsSection from "@/components/sections/CowsSection";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/HeroSection";
import { usePersistLoginQuery } from "@/redux/features/auth/authApi";
import Loading from "./loading";
import { useAppSelector } from "@/redux/hooks";

export default function Home() {
  const { isLoading } = usePersistLoginQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Container>
        <div>
          <HeroSection />
          <CowsSection />
        </div>
      </Container>
      <Footer />
    </>
  );
}
