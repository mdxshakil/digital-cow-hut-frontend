import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";

type IProps = {
  actionFn: (id?: string) => void;
  message: string;
  id?: string;
  isLoading: boolean;
};

const DeleteModal = ({ actionFn, message, id, isLoading }: IProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isLoading ? (
          <Button size={"xs"} variant={"destructive"}>
            <Loader2 size={16} className="animate-spin" />
          </Button>
        ) : (
          <Button size={"xs"} variant={"destructive"}>
            <Trash size={16} />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            {message}
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => actionFn(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
