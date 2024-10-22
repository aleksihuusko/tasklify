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

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Min 8 characters" }),
});

export function SignUpCard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Card className="h-full w-full max-w-md border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center text-sm text-muted-foreground">
            Create an account to continue.
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="inline-flex w-full items-center justify-between gap-2">
                      <FormLabel className="text-foreground">Name</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input type="text" placeholder="Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between gap-2">
                      <FormLabel className="text-sm text-foreground">
                        Email
                      </FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between gap-2">
                      <FormLabel className="text-sm text-foreground">
                        Password
                      </FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button size="lg" type="submit" className="mt-2 w-full">
                Create account
              </Button>
            </form>
          </Form>
          <Separator className="mb-4 mt-8" />
          <Button
            size="lg"
            variant="outline"
            className="mt-4 inline-flex w-full items-center gap-2"
          >
            <FcGoogle className="size-5" />
            Sign up with Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2">
          <Separator className="mb-3 mt-2" />
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
      <p className="mt-4 text-balance text-center text-xs text-muted-foreground">
        By signing up, you agree to our{" "}
        <Link href="/terms" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
      </p>
    </>
  );
}
