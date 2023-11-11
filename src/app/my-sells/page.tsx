"use client"
import Container from "@/components/Container";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import React from "react";

export default function MySellsPage() {
  const { data } = useGetAllOrdersQuery(undefined);

  console.log(data);

  return <Container>page</Container>;
}
