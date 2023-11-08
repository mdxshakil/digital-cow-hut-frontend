"use client";
import Container from "@/components/Container";
import useGetUserFromStore from "@/hooks/useGetUserFromStore";
import { useGetMyCartQuery } from "@/redux/features/cart/cartApi";

export default function CartPage() {
  const { userId } = useGetUserFromStore();
  const {
    data,
    isLoading: cartLoading,
    isError,
    error,
  } = useGetMyCartQuery(userId);

  console.log(data);

  return <Container>CartPage</Container>;
}
