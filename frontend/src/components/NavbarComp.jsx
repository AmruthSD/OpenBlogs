import { Navbar, NavbarBrand, NavbarItem } from "@nextui-org/react";
import Logout from "./auth/Logout";
import { BookOpenText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import useAuthStore from "../zustand/authStore";
import { UserCircle2 } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

export default function NavbarComponent() {
  const isAuth = useAuthStore((state) => state.isAuth);
  return (
    <div>
      <Navbar maxWidth="full">
        <NavbarBrand>
          <BookOpenText className="mx-2 text-blue-600" />
          <Link to="/">
            <p className="font-bold text-inherit">OpenBlogs</p>
          </Link>
        </NavbarBrand>
        <NavbarItem>
          {isAuth ? (
            <PopoverComponent />
          ) : (
            <Link to="/login">
              <Button color="primary" variant="ghost">
                Login
              </Button>
            </Link>
          )}
        </NavbarItem>
      </Navbar>
    </div>
  );
}

function PopoverComponent() {
  const auth = useAuthStore((state) => state.authdata);
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button isIconOnly color="primary" variant="ghost">
            <UserCircle2 />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <p className="text-center text-lg py-4">{auth?.username}</p>
            <Logout />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
