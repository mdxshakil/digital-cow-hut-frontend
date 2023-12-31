"use client";
import Container from "@/components/Container";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { USER_ROLE } from "@/types";
import React from "react";
import Loading from "../loading";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrderItem } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TableHeaderOptions from "@/components/TableHeaderOptions";

const tableHeaders = [
  "Image",
  "Price",
  "Weight",
  "Breed",
  "Cow Location",
  "Shipping Address",
  "Delivery Status",
];

export default function MySellsPage() {
  //protect route
  const { isLoading: authLoading } = useAuthCheck(USER_ROLE.SELLER);
  const { data: orders, isLoading, isError } = useGetAllOrdersQuery(undefined);

  //decide what to render
  let content;
  if (isLoading || authLoading) {
    return <Loading />;
  } else if (!isLoading && isError) {
    content = <p className="text-center">An error occured</p>;
  } else if (!isLoading && !isError && orders.data.length === 0) {
    content = <p className="text-center">You dont have any sells yet</p>;
  } else if (!isLoading && !isError && orders.data.length > 0) {
    content = (
      <TableBody>
        {orders?.data?.map((order: IOrderItem) => (
          <TableRow key={order._id}>
            <TableCell>
              <Avatar>
                <AvatarImage src={order.cow.image} />
                <AvatarFallback>COW</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{order.cow.price}</TableCell>
            <TableCell>{order.cow.weight}</TableCell>
            <TableCell>{order.cow.breed}</TableCell>
            <TableCell>{order.cow.location}</TableCell>
            <TableCell>{order.shippingAddress}</TableCell>
            <TableCell>{order.isDelivered ? "Delivered" : "Pending"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  return (
    <Container>
      <div className="mt-12">
        <div>
          <Table>
            <TableCaption>A list of your sells.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHeaderOptions headers={tableHeaders} />
              </TableRow>
            </TableHeader>
            {content}
          </Table>
        </div>
      </div>
    </Container>
  );
}
