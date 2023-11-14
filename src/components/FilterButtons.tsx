import React from "react";
import { Button } from "./ui/button";

type IProps = {
  filter: string;
  setFilter: (filter: string) => void;
};

export default function FilterButtons({ filter, setFilter }: IProps) {
  return (
    <div className="flex gap-3 mb-3">
      <Button
        size="xs"
        className="px-4"
        variant={filter === "all" ? "secondary" : "outline"}
        onClick={() => setFilter("all")}
      >
        All
      </Button>
      <Button
        size="xs"
        className="px-4"
        variant={filter === "for sale" ? "secondary" : "outline"}
        onClick={() => setFilter("for sale")}
      >
        For Sale
      </Button>
      <Button
        size="xs"
        className="px-4"
        variant={filter === "sold out" ? "secondary" : "outline"}
        onClick={() => setFilter("sold out")}
      >
        Sold Out
      </Button>
    </div>
  );
}
