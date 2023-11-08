import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";

type IProps = {
  role: string;
  profilePicture: string;
  name: {
    firstName: string;
    lastName: string;
  };
};

export default function ProfileButton({
  role,
  profilePicture,
  name: { firstName, lastName },
}: IProps) {
  const dispatch = useAppDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={profilePicture}
            className={`border-2 rounded-full ${
              role === "buyer"
                ? "border-primary"
                : role === "seller"
                ? "border-orange-500"
                : role === "admin"
                ? "border-red-500"
                : ""
            }`}
          />

          <AvatarFallback>SH</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{firstName + " " + lastName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(userLoggedOut())}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
