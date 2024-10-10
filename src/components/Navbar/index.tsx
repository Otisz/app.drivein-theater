import { LogoutDropdownButton } from "@/components/auth/LogoutButton";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentSession } from "@/lib/auth";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default async function Navbar() {
  const session = await getCurrentSession();

  return (
    <nav className="flex h-20 gap-4 bg-red-300">
      <Link href="/" className="inline-flex items-center px-8 text-3xl">
        Drive-in Theater
      </Link>
      <div className="flex flex-1 items-center justify-center gap-4">
        <Link href="/" className="inline-flex h-full items-center px-4">
          Agenda
        </Link>
        <Link href="/movies" className="inline-flex h-full items-center px-4">
          Movies
        </Link>
      </div>
      <div>Todo Theme switcher</div>
      {session ? (
        <div className="flex w-32 items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>{session.user.name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <LogoutDropdownButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex w-32 items-center justify-center">
          <Link href="/auth/login" className={buttonVariants()}>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
