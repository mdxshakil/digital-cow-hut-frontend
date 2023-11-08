import React from "react";
import { TableCell, TableRow } from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ShoppingBag, Trash } from "lucide-react";
import { ICart } from "@/types/types";

export default function CartTableRow({ cartItem }: { cartItem: ICart }) {
  const { name, weight, category, location, price, image } = cartItem.cowId;
  return (
    <TableRow>
      <TableCell>
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{weight}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>{location}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>
        <div className="flex gap-3 items-center">
          <Button size={"xs"} variant={"default"}>
            <ShoppingBag size={16} />
          </Button>
          <Button size={"xs"} variant={"destructive"}>
            <Trash size={16} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
