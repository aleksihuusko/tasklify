"use client";

import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { loginSchema } from "../schemas";
import { useLogin } from "../api/use-login";

export function SignInCard() {
  const { mutate, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate({ json: values });
  }

  return (
    <Card className="h-full w-full max-w-md border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Sign In
        </CardTitle>
        <CardDescription className="text-center text-sm text-muted-foreground">
          Sign in to your account to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="mb-6" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="inline-flex w-full items-center justify-between gap-2">
                    <FormLabel className="text-foreground">Email</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      autoComplete="email"
                      type="email"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="inline-flex w-full items-center justify-between gap-2">
                    <FormLabel className="text-foreground">Password</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              size="lg"
              type="submit"
              className="mt-2 w-full"
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
        <Separator className="mb-4 mt-8" />
        <Button
          disabled={isPending}
          size="lg"
          variant="outline"
          className="mt-4 inline-flex w-full items-center gap-2"
        >
          <FcGoogle className="size-5" />
          Login with Google
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        <Separator className="mb-3 mt-2" />
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
