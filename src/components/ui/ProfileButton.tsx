import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { profileOptions } from "@/constants/navbar";
import { apiSlice } from "@/redux/api/apiSlice";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const options = profileOptions(role);
  const router = useRouter();
  const handleLogOut = () => {
    dispatch(userLoggedOut());
    // router.push("/");
    // dispatch(apiSlice.util.resetApiState());
  };

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
        {options?.map((option) => (
          <DropdownMenuItem key={option.id}>
            <Link href={option.path}>{option.label}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={handleLogOut} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
