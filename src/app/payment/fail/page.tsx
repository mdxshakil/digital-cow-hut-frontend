import Container from "@/components/Container";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type IProps = {
  params: {
    slug: string;
  };
};

export default function page({ params }: IProps) {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen place-items-center gap-0 md:gap-12">
        <div className="hidden md:block">
          <Image
            src={"/img/purchase/failed-purchase.png"}
            alt="Purchase-Fail-Image"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            loading="lazy"
          />
        </div>
        <Card className="w-full md:w-2/3 p-3">
          <XCircle className="text-center w-full text-red-500" size={40} />
          <div className="text-center mb-2">
            <h1 className="text-2xl text-red-500 font-bold ">
              There was a problem with your purchase
            </h1>
          </div>

          <Link href={"/"}>
            <p className="mt-2 text-primary text-center text-sm">Go to home</p>
          </Link>
        </Card>
      </div>
    </Container>
  );
}
