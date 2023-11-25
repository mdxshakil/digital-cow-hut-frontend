"use client";
import { ICow } from "@/types/types";
import CowCard from "../CowCard";
import useGetUserFromStore from "@/hooks/useGetUserFromStore";
import { useGetAllCowsQuery } from "@/redux/features/cow/cowApi";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import { cowQuery } from "@/constants/cow";
import Loading from "@/app/loading";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

const CowsSection = () => {
  const { role, userId } = useGetUserFromStore();
  const router = useRouter();
  const {
    data: cows,
    isLoading,
    isError,
    error,
  } = useGetAllCowsQuery(cowQuery);

  const [addToCart, addToCartStatus] = useAddToCartMutation();

  const handleAddToCart = async (cowId: string) => {
    if (!userId) {
      router.push("/login");
      return;
    }
    const cartData = { cowId, buyerId: userId };
    await addToCart(cartData);
  };

  useEffect(() => {
    if (addToCartStatus.isSuccess) {
      toast.success("Added to cart");
    }
    if (addToCartStatus.isError) {
      toast.error(
        (addToCartStatus.error as any)?.data?.message || "Failed to add to cart"
      );
    }
  }, [addToCartStatus]);

  //decide what to render
  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <p className="text-center">An error occured</p>;
  } else if (!isLoading && !isError && cows?.data?.length === 0) {
    content = <p className="text-center">No cows available</p>;
  } else if (!isLoading && !isError && cows?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cows?.data?.map((cow: ICow) => (
          <CowCard
            key={cow._id}
            cow={cow}
            userRole={role}
            handleAddToCart={handleAddToCart}
            isLoading={addToCartStatus.isLoading}
            userId={userId}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="py-12 md:py-24">
      <h2 className="text-center text-4xl tracking-wider mb-12 md:mb-20">
        Available cows
      </h2>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <div>{content}</div>
      </div>
      <div className="text-center">
        <Button className="mt-6" size={"sm"}>
          <Link href={"/cows"}>Browse all cows</Link>
        </Button>
      </div>
    </div>
  );
};

export default CowsSection;
