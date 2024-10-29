"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { ImageIcon } from "lucide-react";
import { useRef } from "react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { createWorkspaceSchema } from "../schemas";
import useCreateWorkspace from "../api/use-create-workspace";

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

export default function CreateWorkspaceForm({
  onCancel,
}: CreateWorkspaceFormProps) {
  const { mutate, isPending } = useCreateWorkspace();

  const imageInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    mutate({ form: finalValues });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
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
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className="flex items-center gap-4">
                    <Avatar
                      className="relative flex size-20 cursor-pointer items-center gap-5"
                      onClick={() => imageInputRef.current?.click()}
                    >
                      {field.value ? (
                        <AvatarImage
                          src={
                            field.value instanceof File
                              ? URL.createObjectURL(field.value)
                              : field.value
                          }
                          alt="Workspace image"
                          className="object-cover"
                        />
                      ) : (
                        <AvatarFallback className="size-20">
                          <ImageIcon className="size-8 text-muted-foreground" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex flex-row items-center gap-8">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">Workspace image</p>
                        <p className="text-xs text-muted-foreground">
                          Maximum size 1MB (JPG, PNG, SVG, JPEG)
                        </p>
                        <input
                          type="file"
                          ref={imageInputRef}
                          className="hidden"
                          accept=".png, .jpg, .jpeg, .svg"
                          disabled={isPending}
                          onChange={handleImageChange}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isPending}
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        className="mt-2 w-fit"
                      >
                        Upload image
                      </Button>
                    </div>
                  </div>
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
