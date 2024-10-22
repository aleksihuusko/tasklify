"use client";

import { useRouter } from "next/navigation";

import { useUser } from "@/features/auth/api/use-user";
import useLogout from "@/features/auth/api/use-logout";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useUser();
  const { mutate } = useLogout();

  if (isLoading)
    return (
      <main className="flex h-screen flex-col items-center justify-center">
        <ReloadIcon className="size-4 animate-spin text-primary" />
      </main>
    );

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Logo />
      {data ? (
        <Button onClick={() => mutate()}>Logout</Button>
      ) : (
        <Button onClick={() => router.push("/sign-in")}>Sign in</Button>
      )}
      {data && (
        <pre className="mt-4 text-xs">{JSON.stringify(data, null, 2)}</pre>
      )}
    </main>
  );
}
