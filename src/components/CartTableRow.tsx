"use client";
import React from "react";
import { TableCell, TableRow } from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ShoppingBag, Trash } from "lucide-react";
import { ICart } from "@/types/types";
import { useRemoveFromCartMutation } from "@/redux/features/cart/cartApi";
import OrderPlaceModal from "./ui/OrderPlaceModal";
import DeleteModal from "./ui/DeleteModal";

export default function CartTableRow({ cartItem }: { cartItem: ICart }) {
  const { name, weight, category, location, price, image } = cartItem.cowId;
  const [removeFromCart] = useRemoveFromCartMutation();

  const handleRemoveFromCart = async () => {
    await removeFromCart(cartItem._id);
  };

  return (
    <TableRow>
      <TableCell>
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>COW</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{weight}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>{location}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>
        <span className="flex gap-3 items-center">
          <Button size={"xs"} variant={"default"}>
            {/* <ShoppingBag size={16} /> */}
            <OrderPlaceModal
              cow={cartItem.cowId}
              btnSize="xs"
              btnChild={<ShoppingBag size={16} />}
            />
          </Button>
          <DeleteModal actionFn={handleRemoveFromCart} />
        </span>
      </TableCell>
    </TableRow>
  );
}
