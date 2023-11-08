"use client";
import Container from "@/components/Container";
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
        </div>
      </Container>
      <Footer />
    </>
  );
}
