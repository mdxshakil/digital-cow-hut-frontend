"use client";
import Container from "@/components/Container";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IOrderItem } from "@/types/types";
import TableHeaderOptions from "@/components/TableHeaderOptions";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import Loading from "../loading";
import { USER_ROLE } from "@/types";
const tableHeaders = [
  "Image",
  "TransactionID",
  "Cow Location",
  "Weight(KG)",
  "Original Price",
  "Delivery",
];

export default function MyOrdersPage() {
  // protect route
  const { isLoading: authLoading } = useAuthCheck(USER_ROLE.BUYER);
  const { data, isLoading, isError } = useGetAllOrdersQuery(undefined);

  //decide what to render
  let content;
  if (isLoading || authLoading) {
    return <Loading />;
  } else if (!isLoading && isError) {
    content = <p className="text-center">An error occured</p>;
  } else if (!isLoading && !isError && data.data.length === 0) {
    content = (
      <p className="text-center">You haven&apos;t purchased any cow yet</p>
    );
  } else if (!isLoading && !isError && data.data.length > 0) {
    content = (
      <TableBody>
        {data?.data.map((orderItem: IOrderItem) => (
          <TableRow key={orderItem._id}>
            <TableCell>
              <Avatar>
                <AvatarImage src={orderItem.cow.image} />
                <AvatarFallback>COW</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{orderItem.transactionId}</TableCell>
            <TableCell>{orderItem.cow.location}</TableCell>
            <TableCell>{orderItem.cow.weight}</TableCell>
            <TableCell>{orderItem.cow.price}</TableCell>
            <TableCell>
              {orderItem.isDelivered ? "Delivered" : "Pending"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  return (
    <Container>
      <Table>
        <TableCaption>A list of your orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHeaderOptions headers={tableHeaders} />
          </TableRow>
        </TableHeader>
        {content}
      </Table>
    </Container>
  );
}
