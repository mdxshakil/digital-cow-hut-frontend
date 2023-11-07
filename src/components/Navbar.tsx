"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart, Sun, Moon } from "lucide-react";
import { Menu } from "lucide-react";
import Container from "./Container";
import ProfileButton from "./ui/ProfileButton";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useTheme } from "next-themes";
import { useAppSelector } from "@/redux/hooks";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user } = useAppSelector((state) => state.auth);

  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/",
      label: "Cows",
    },
    {
      href: "/",
      label: "Other",
    },
  ];
  return (
    <header className="sm:flex sm:justify-between  border-b">
      <Container>
        <div className="relative flex h-16 items-center justify-between w-full">
          {/* mobile nav */}
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side={"left"} className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {routes.map((route, i) => (
                    <Link key={i} href={route.href} className="block px-2 py-1">
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href={"/"} className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">CowHut</h1>
            </Link>
          </div>
          {/* desktop nav */}
          <nav className="mx-6 flx items-center space-x-4 lg:space-x-6 hidden md:block">
            {routes.map((route, i) => (
              <Button asChild variant={"ghost"} key={i}>
                <Link
                  href={route.href}
                  className="text-sm font-medium transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center">
            <Link href={"/cart"}>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="mr-2"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </Link>
            {/* theme switcher */}
            <Button
              variant={"ghost"}
              size={"icon"}
              aria-label="Toggle Theme"
              className="mr-6"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
            {user?.userId ? (
              <ProfileButton />
            ) : (
              <Link href={"/login"}>
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
