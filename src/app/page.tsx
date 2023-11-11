"use client";
import Container from "@/components/Container";
import CouponSection from "@/components/sections/CouponSection";
import CowsSection from "@/components/sections/CowsSection";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <>
      <Container>
        <div>
          <HeroSection />
          <CowsSection />
          <CouponSection />
        </div>
      </Container>
      <Footer />
    </>
  );
}
