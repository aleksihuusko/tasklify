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

export function SignUpCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(password);
  };

  return (
    <Card className="h-full w-full max-w-md border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Sign Up
        </CardTitle>
        <CardDescription className="text-center text-sm text-muted-foreground">
          Use your name, email and password to sign up.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="mb-6" />

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            disabled={false}
          />
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
            Sign up
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="inline-flex items-center gap-2"
          >
            <FcGoogle className="size-5" />
            with Google
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        <Separator className="mb-4" />
        <p className="text-center text-sm">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
        </p>
        <div className="inline-flex items-center gap-2">
          <span className="text-sm">
            Already have an account?{" "}
            <Button asChild variant="link" className="px-0">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
