"use client";
import Container from "@/components/Container";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IOrderItem } from "@/types/types";
import TableHeaderOptions from "@/components/TableHeaderOptions";

export default function MyOrdersPage() {
  const { data } = useGetAllOrdersQuery(undefined);
  const tableHeaders = [
    "Image",
    "TransactionID",
    "Cow Location",
    "Weight(KG)",
    "Amount",
    "Delivery",
  ];

  return (
    <Container>
      <Table>
        <TableCaption>A list of your orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHeaderOptions headers={tableHeaders} />
          </TableRow>
        </TableHeader>
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
      </Table>
    </Container>
  );
}
