import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function SignInCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  };

  return (
    <Card className="h-full w-full max-w-md border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Sign In
        </CardTitle>
        <CardDescription className="text-center text-sm text-muted-foreground">
          Use your email and password to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="mb-6" />

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={false}
          />
          <Input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={false}
            minLength={8}
            maxLength={32}
          />
          <Button size="lg" disabled={!email || !password} type="submit">
            Sign in
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="inline-flex items-center gap-2"
          >
            <FcGoogle className="size-5" />
            Login with Google
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        <Separator />
        <div className="inline-flex items-center gap-2">
          <span className="text-sm">
            Don&apos;t have an account?{" "}
            <Button asChild variant="link" className="px-0">
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
