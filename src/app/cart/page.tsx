"use client";
import Container from "@/components/Container";
import useGetUserFromStore from "@/hooks/useGetUserFromStore";
import { useGetMyCartQuery } from "@/redux/features/cart/cartApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "../loading";
import { ICart } from "@/types/types";
import CartTableRow from "@/components/CartTableRow";
import TableHeaderOptions from "@/components/TableHeaderOptions";
import { useAuthCheck } from "@/hooks/useAuthCheck";
const tableHeaders = [
  "Image",
  "Name",
  "Weight",
  "Category",
  "Location",
  "Price",
  "Action",
];

export default function CartPage() {
  // get user from store
  const { userId, role } = useGetUserFromStore();
  //protect route
  const { isLoading } = useAuthCheck(role);
  const { data, isLoading: cartLoading, isError } = useGetMyCartQuery(userId);

  //decide what to render
  let content;
  if (cartLoading || isLoading) {
    return <Loading />;
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
            <TableHeaderOptions headers={tableHeaders} />
          </TableRow>
        </TableHeader>
        <TableBody>{content}</TableBody>
      </Table>
    </Container>
  );
}
