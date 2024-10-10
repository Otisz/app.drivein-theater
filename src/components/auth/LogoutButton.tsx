"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export const LogoutDropdownButton = () => {
  return (
    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/auth/login" })} className="cursor-pointer">
      <LogOutIcon className="mr-2 h-4 w-4" />
      <span>Logout</span>
    </DropdownMenuItem>
  );
};
