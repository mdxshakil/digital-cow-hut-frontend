"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  useDeleteCowMutation,
  useGetAllCowsQuery,
} from "@/redux/features/cow/cowApi";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICow } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DeleteModal from "@/components/ui/DeleteModal";
import TableHeaderOptions from "@/components/TableHeaderOptions";
import Loading from "../loading";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { USER_ROLE } from "@/types";

const tableHeaders = [
  "Image",
  "Price",
  "Weight",
  "Breed",
  "Location",
  "Label",
  "Delete",
];

export default function MyCowsPage() {
  const { isLoading: authLoading } = useAuthCheck(USER_ROLE.ADMIN);
  const { data: cows, isLoading, isError } = useGetAllCowsQuery(undefined);
  const [
    deleteCow,
    {
      isLoading: deleteLoading,
      isError: deleteError,
      isSuccess: deleteSuccess,
    },
  ] = useDeleteCowMutation();

  const handleDeleteCow = (cowId: string) => {
    deleteCow(cowId);
  };

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Cow Deleted Successfully");
    }
    if (deleteError) {
      toast.error("Failed to delete cow");
    }
  }, [deleteError, deleteSuccess]);

  //decide what to render
  let content;
  if (isLoading || authLoading) {
    return <Loading />;
  } else if (!isLoading && isError) {
    content = <p className="text-center">An error occured</p>;
  } else if (!isLoading && !isError && cows.data.length === 0) {
    content = <p className="text-center">You have not posted any cow yet</p>;
  } else if (!isLoading && !isError && cows.data.length > 0) {
    content = (
      <TableBody>
        {cows?.data?.map((cow: ICow) => (
          <TableRow key={cow._id}>
            <TableCell>
              <Avatar>
                <AvatarImage src={cow.image} />
                <AvatarFallback>COW</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{cow.price}</TableCell>
            <TableCell>{cow.weight}</TableCell>
            <TableCell>{cow.breed}</TableCell>
            <TableCell>{cow.location}</TableCell>
            <TableCell>{cow.label}</TableCell>
            <TableCell>
              {cow.label === "for sale" ? (
                deleteLoading ? (
                  <Button disabled variant={"destructive"} className="btn-xs">
                    <Loader2 className="animate-spin" size={16} />
                  </Button>
                ) : (
                  <DeleteModal
                    actionFn={() => handleDeleteCow(cow._id)}
                    message="Delete this cow permanently?"
                    id={cow._id}
                    isLoading={deleteLoading}
                  />
                )
              ) : (
                <Badge>Sold</Badge>
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
          <div>
            <Table>
              <TableCaption>A list of your cows.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHeaderOptions headers={tableHeaders} />
                </TableRow>
              </TableHeader>
              {content}
            </Table>
          </div>
        </div>
      </div>
    </Container>
  );
}
