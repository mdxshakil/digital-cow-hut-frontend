import React from "react";
import { TableHead } from "./ui/table";
type IProps = {
  headers: string[];
};

export default function TableHeaderOptions({ headers }: IProps) {
  return headers.map((header, i) => <TableHead key={i}>{header}</TableHead>);
}
