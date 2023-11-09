import { ICow } from "@/types/types";
import React, { useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import OrderPlaceModal from "./ui/OrderPlaceModal";

type IProps = {
  cow: ICow;
  userRole: string;
  handleAddToCart: (cowId: string) => void;
  isLoading: boolean;
  userId: string;
};

export default function CowCard({
  cow,
  userRole,
  handleAddToCart,
  isLoading,
}: IProps) {
  return (
    <div
      key={cow._id}
      className="outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg"
    >
      <Card className="rounded-lg border-2">
        <CardHeader className="pt-4">
          <div className="aspect-square relative bg-foreground/5 dark:bg-background rounded-lg">
            <Image
              src={cow.image}
              alt={cow.name}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }} //
              loading="lazy"
              className="aspect-square object-cover rounded-lg transition-all duration-300 hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-col items-start">
          <div>
            <p className="font-semibold text-lg">{cow.name}</p>
            <div className="font-sm text-primary/80">
              <Badge
                className="px-2 py-0 "
                variant={cow.category === "Beef" ? "destructive" : "default"}
              >
                {cow.category}
              </Badge>
              <Badge
                className="px-2 py-0 ml-2 "
                variant={cow.label === "sold out" ? "outline" : "secondary"}
              >
                {cow.label}
              </Badge>
            </div>
          </div>
          <div>
            {cow?.price} <span className="">&#2547;</span>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end gap-3 w-full">
            {cow.label === "sold out" ? (
              <Badge>Sold out</Badge>
            ) : (
              <>
                <Button
                  size={"sm"}
                  variant={"outline"}
                  onClick={() => handleAddToCart(cow._id)}
                  disabled={userRole !== "buyer" || isLoading}
                >
                  Add to cart
                </Button>
                {/* <Button size={"sm"} onClick={handlePlaceOrder}>
                  Buy Now
                </Button> */}
                <OrderPlaceModal cow={cow} />
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
