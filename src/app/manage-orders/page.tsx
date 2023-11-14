"use client";
import Container from "@/components/Container";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import {
  useDeliverOrderMutation,
  useGetAllOrdersQuery,
} from "@/redux/features/order/orderApi";
import { USER_ROLE } from "@/types";
import React, { useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const tableHeaders = [
  "Image",
  "Price",
  "Weight",
  "Breed",
  "Cow Location",
  "Shipping Address",
  "Delivery Status",
];

export default function ManageOrdersPage() {
  //protect route
  const { isLoading: authLoading } = useAuthCheck(USER_ROLE.ADMIN);
  const { data: orders, isLoading, isError } = useGetAllOrdersQuery(undefined);
  const [deliverOrder, deliverStatus] = useDeliverOrderMutation();

  const handleDeliverOder = (orderId: string) => {
    deliverOrder(orderId);
  };

  useEffect(() => {
    if (deliverStatus.isSuccess) {
      toast.success("Order delivered Successfully");
    }
    if (deliverStatus.isError) {
      toast.error("Failed to deliver");
    }
  }, [deliverStatus]);

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
            <TableCell>
              {order.isDelivered ? (
                <Badge>Delivered</Badge>
              ) : (
                <Button
                  size={"sm"}
                  onClick={() => handleDeliverOder(order._id)}
                >
                  Deliver
                </Button>
              )}
            </TableCell>
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
            <TableCaption>A list of all the orders</TableCaption>
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
