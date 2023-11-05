import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ICow } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

async function getCows() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/cows?limit=8&sortBy=createdAt&sortOrder=desc&label=for sale`,
    {
      next: {
        revalidate: 0,
      },
    }
  );
  return result.json();
}

const CowsSection = async () => {
  const cows = await getCows();

  return (
    <div className="py-12 md:py-24">
      <h2 className="text-center text-4xl tracking-wider mb-12">
        Available cows
      </h2>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cows?.data?.map((cow: ICow) => (
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
                        style={{ width: "100%", height: "auto" }}
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
                          variant={
                            cow.category === "Beef" ? "destructive" : "default"
                          }
                        >
                          {cow.category}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      {cow?.price} <span className="">&#2547;</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-end gap-3 w-full">
                      <Button size={"sm"} variant={"outline"}>
                        Add to cart
                      </Button>
                      <Button size={"sm"}>Buy Now</Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CowsSection;
