"use client";
import Loading from "@/app/loading";
import Container from "@/components/Container";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetOrderByTranIdQuery } from "@/redux/features/order/orderApi";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type IProps = {
  params: {
    slug: string;
  };
};

export default function SuccessPage({ params }: IProps) {
  const { data, isLoading } = useGetOrderByTranIdQuery(params.slug);
  const { cow, transactionId } = data?.data || {};

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen place-items-center gap-0 md:gap-12">
        <div className="hidden md:block">
          <Image
            src={"/img/purchase/success-purchase.png"}
            alt="Purchase-Success-Image"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            loading="lazy"
          />
        </div>
        <Card className="w-full md:w-2/3 p-3">
          <CheckCircle className="text-center w-full text-primary" size={40} />
          <div className="text-center mb-2">
            <h1 className="text-xl text-primary font-bold ">
              YAY!, your purchase was successful!
            </h1>
            <p className="text-sm">Transaction ID: {transactionId}</p>
          </div>
          <Separator className="mb-3" />
          <div className="text-center">
            <p>Amount paid: {cow?.price} BDT</p>
          </div>

          <Link href={"/my-orders"}>
            <p className="mt-2 text-primary text-center text-sm">
              Go to my orders
            </p>
          </Link>
        </Card>
      </div>
    </Container>
  );
}
