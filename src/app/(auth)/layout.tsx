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
        <nav className="flex items-center justify-between py-2">
          <Link href="/" className="py-2">
            <Logo className="h-8 w-auto" />
          </Link>
          {pathname === "/sign-in" ? (
            <Button asChild variant="outline">
              <Link href="/sign-up">Sign up</Link>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          )}
        </nav>
        <div className="flex h-full flex-col items-center justify-center pt-12">
          {children}
        </div>
      </div>
    </main>
  );
}
