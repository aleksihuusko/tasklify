"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="container mx-auto px-[5%]">
        <nav className="flex items-center justify-between py-4">
          <Logo />

          <Button asChild variant="outline">
            <Link href={pathname === "/sign-in" ? "/sign-up" : "/sign-in"}>
              {pathname === "/sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </Button>
        </nav>
        <div className="flex h-full flex-col items-center justify-center pt-12">
          {children}
        </div>
      </div>
    </main>
  );
}
