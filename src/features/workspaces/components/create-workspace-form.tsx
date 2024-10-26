"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { createWorkspaceSchema } from "../schemas";
import useCreateWorkspace from "../api/use-create-workspace";

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

export default function CreateWorkspaceForm({
  onCancel,
}: CreateWorkspaceFormProps) {
  const { mutate, isPending } = useCreateWorkspace();

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
    console.log({ values });
    mutate({ json: values });
  };

  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader className="flex p-8">
        <CardTitle className="text-xl font-semibold">
          Create a new workspace
        </CardTitle>
        <Separator className="!mt-8" />
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between gap-2">
                      Workspace name <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Workspace name"
                      />
                    </FormControl>
                    <FormDescription>
                      This is the name of your workspace.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <Separator className="!mt-8" />
            <div className="mt-8 flex w-full items-center justify-between">
              <Button
                variant="outline"
                size="lg"
                type="button"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="lg"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create workspace"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
