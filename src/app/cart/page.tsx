"use client";
import Container from "@/components/Container";
import useGetUserFromStore from "@/hooks/useGetUserFromStore";
import { useGetMyCartQuery } from "@/redux/features/cart/cartApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "../loading";
import { ICart } from "@/types/types";
import CartTableRow from "@/components/CartTableRow";

export default function CartPage() {
  const { userId } = useGetUserFromStore();
  const { data, isLoading: cartLoading, isError } = useGetMyCartQuery(userId);
  console.log(data);

  //decide what to render
  let content;
  if (cartLoading) {
    content = <Loading />;
  } else if (!cartLoading && isError) {
    content = <p className="text-center">An error occured</p>;
  } else if (!cartLoading && !isError && data.data.length === 0) {
    content = <p className="text-center">Cart is empty</p>;
  } else if (!cartLoading && !isError && data.data.length > 0) {
    content = data?.data?.map((cartItem: ICart) => (
      <CartTableRow key={cartItem._id} cartItem={cartItem} />
    ));
  }

  return (
    <Container>
      <Table>
        <TableCaption>A list of your cart items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{content}</TableBody>
      </Table>
    </Container>
  );
}
