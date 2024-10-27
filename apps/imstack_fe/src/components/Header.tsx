import React, { ReactNode } from "react";
import { CircleUser, CoinsIcon, Layers, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useMatch, useNavigate } from "@tanstack/react-router";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { useAuth } from "@clerk/clerk-react";
import { navItems } from "@/utilts";
import { cn } from "@/lib/utils";
import ProjectTitle from "./ProjectTitle";
import imstackImage from "../images/IMSTACKLOGO.png";

type HeaderPropsType = {
  children: ReactNode;
};

const Header = ({ children }: HeaderPropsType) => {
  const { signOut } = useAuth();
  const { fullPath } = useMatch({ from: "" });
  const navigation = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await signOut();
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
        <nav className="hidden flex-col gap-6 text-lg font-medium lg:flex lg:flex-row lg:items-center lg:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <div className="flex items-center justify-center gap-2">
              <Layers className="h-4 w-4" />
              <h6 className="font-bold text-xl whitespace-nowrap">IM Stack</h6>
            </div>
          </Link>
          {navItems.map(({ item, path }) => (
            <Link
              key={item}
              to={path}
              className={cn(
                "text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap cursor-pointer",
                { "text-foreground": fullPath?.includes(path) }
              )}
            >
              {item}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 lg:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <div className="flex items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1"
                  >
                    <path
                      d="M7.75432 1.81954C7.59742 1.72682 7.4025 1.72682 7.24559 1.81954L1.74559 5.06954C1.59336 5.15949 1.49996 5.32317 1.49996 5.5C1.49996 5.67683 1.59336 5.84051 1.74559 5.93046L7.24559 9.18046C7.4025 9.27318 7.59742 9.27318 7.75432 9.18046L13.2543 5.93046C13.4066 5.84051 13.5 5.67683 13.5 5.5C13.5 5.32317 13.4066 5.15949 13.2543 5.06954L7.75432 1.81954ZM7.49996 8.16923L2.9828 5.5L7.49996 2.83077L12.0171 5.5L7.49996 8.16923ZM2.25432 8.31954C2.01658 8.17906 1.70998 8.2579 1.56949 8.49564C1.42901 8.73337 1.50785 9.03998 1.74559 9.18046L7.24559 12.4305C7.4025 12.5232 7.59742 12.5232 7.75432 12.4305L13.2543 9.18046C13.4921 9.03998 13.5709 8.73337 13.4304 8.49564C13.2899 8.2579 12.9833 8.17906 12.7456 8.31954L7.49996 11.4192L2.25432 8.31954Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <h6 className="font-bold text-xl">IMStack</h6>
                </div>
              </Link>
              {navItems.map(({ item, path }) => (
                <Link
                  key={item}
                  to={path}
                  className={cn(
                    "text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap cursor-pointer",
                    { "text-foreground": fullPath?.includes(path) }
                  )}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[200px] xl:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <img src={imstackImage} className="h-8 w-8 rounded-full" />

                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Tanvir Khan</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigation({ to: "/profile/test" })}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </header>
      <main
        className={
          "flex items-center min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
        }
      >
        {children}
      </main>
    </div>
  );
};

export default Header;
