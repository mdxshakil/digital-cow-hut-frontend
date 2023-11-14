"use client";
import { useGetAllCowsQuery } from "@/redux/features/cow/cowApi";
import { ICow } from "@/types/types";
import Loading from "../loading";
import { useAppSelector } from "@/redux/hooks";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CowCard from "@/components/CowCard";
import { useRouter } from "next/navigation";
import PaginationButton from "@/components/PaginationButton";
import { Button } from "@/components/ui/button";

const AllCowsPage = () => {
  const { userId, role } = useAppSelector((state) => state.auth.user);
  const [addToCart, addToCartStatus] = useAddToCartMutation();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const {
    data: cows,
    isLoading,
    isError,
  } = useGetAllCowsQuery(`limit=${limit}&page=${page}`);

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
        (addToCartStatus.error as any)?.data?.message || "An error occured"
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
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <div>{content}</div>
      </div>
      <PaginationButton
        page={page}
        setPage={setPage}
        pageCount={cows?.meta?.pageCount}
      />
    </div>
  );
};

export default AllCowsPage;
