import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

type IProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageCount: number;
};

export default function PaginationButton({ page, setPage, pageCount }: IProps) {
  return (
    <div className="text-center mt-6">
      <Button
        size={"icon"}
        className="border-r"
        disabled={page === 1}
        onClick={() => setPage((prev: number) => prev - 1)}
      >
        <ChevronLeft />
      </Button>
      <Button
        size={"icon"}
        className="border-l"
        disabled={pageCount === page}
        onClick={() => setPage((prev: number) => prev + 1)}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
