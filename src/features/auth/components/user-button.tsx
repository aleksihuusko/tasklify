"use client";

import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ExitIcon, ReloadIcon } from "@radix-ui/react-icons";

import { useUser } from "../api/use-user";
import useLogout from "../api/use-logout";

export default function UserButton() {
  const { data: user, isLoading } = useUser();
  const { mutate: logout } = useLogout();
  const router = useRouter();

  if (isLoading)
    return (
      <Button
        size="icon"
        variant="ghost"
        className="size-10 rounded-full bg-muted"
      >
        <ReloadIcon className="size-2 animate-spin" />
        <span className="sr-only">Loading</span>
      </Button>
    );

  if (!user)
    return <Button onClick={() => router.push("/sign-in")}>Sign in</Button>;

  const { name, email } = user;
  const userFallback = name?.[0] ?? email?.[0] ?? "U";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="rounded-full outline-none">
        <Avatar>
          <AvatarImage src={undefined} />
          <AvatarFallback>{userFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuLabel className="pb-1.5 pt-0 text-xs font-normal text-muted-foreground">
          {email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          Logout
          <DropdownMenuShortcut>
            <ExitIcon className="size-3" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
