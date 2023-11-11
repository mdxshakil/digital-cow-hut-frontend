"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function MyCowsPage() {
  return (
    <Container>
      <div className="mt-12">
        <div>
          <Button>
            <Link href={"/my-cows/post-new-cow"}>Post new Cow</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
