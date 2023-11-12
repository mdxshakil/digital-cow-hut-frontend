"use client";
import React, { useEffect } from "react";
import { TableCell, TableRow } from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ShoppingBag, Trash } from "lucide-react";
import { ICart } from "@/types/types";
import { useRemoveFromCartMutation } from "@/redux/features/cart/cartApi";
import OrderPlaceModal from "./ui/OrderPlaceModal";
import DeleteModal from "./ui/DeleteModal";
import toast from "react-hot-toast";

export default function CartTableRow({ cartItem }: { cartItem: ICart }) {
  const { name, weight, category, location, price, image } = cartItem.cowId;
  const [removeFromCart, { isLoading, isError, error, isSuccess }] =
    useRemoveFromCartMutation();

  const handleRemoveFromCart = async () => {
    await removeFromCart(cartItem._id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Item removed from cart");
    }
    if (isError) {
      toast.error((error as any)?.data.message || "An error occured");
    }
  }, [error, isError, isSuccess]);

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
          <OrderPlaceModal
            cow={cartItem.cowId}
            btnSize="xs"
            btnChild={<ShoppingBag size={16} />}
          />
          <DeleteModal
            actionFn={handleRemoveFromCart}
            message="Remove this cow from cart?"
            isLoading={isLoading}
          />
        </span>
      </TableCell>
    </TableRow>
  );
}
