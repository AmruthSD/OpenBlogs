/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jxWLyLdy7P6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { Book, UserCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logout from "./auth/Logout";
import useAuthStore from "../zustand/authStore";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

export default function Component() {
  const isAuth = useAuthStore((state) => state.isAuth);
  return (
    <nav className="flex items-center gap-4 text-sm font-medium py-3 px-2">
      <div className="flex items-center gap-2">
        <Link className="flex items-center gap-2 font-bold" to="/">
          <Book className="h-8 w-8" />
          <span className=" text-xl">OpenBlogs</span>
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Link to="/blogs">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        {isAuth ? (
          <PopoverComponent />
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

function PopoverComponent() {
  const auth = useAuthStore((state) => state.authdata);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full border-gray-900 w-10 h-10"
          variant="ghost"
        >
          <Avatar className="w-8 h-8">
            <UserCircleIcon className="mx-auto my-auto"/>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className=""><strong>{auth?.username}</strong></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem> <Logout/></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
