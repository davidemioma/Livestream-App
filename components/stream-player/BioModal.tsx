"use client";

import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { updateUserInfo } from "@/lib/actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, UserValidator } from "@/lib/validators/user";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Props = {
  initialValue: string | null;
};

const BioModal = ({ initialValue }: Props) => {
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<UserValidator>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      bio: initialValue ?? undefined,
    },
  });

  const onSubmit = (values: UserValidator) => {
    startTransition(() => {
      updateUserInfo({
        ...values,
      })
        .then(() => {
          toast.success("User updated successfully");

          setOpen(false);
        })
        .catch((error) => {
          toast.error("Something went wrong! Unable to update user.");
        });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Edit Your Bio</DialogTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>

                    <FormControl>
                      <Textarea
                        placeholder="Write Something..."
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end gap-2">
                <DialogClose asChild disabled={isPending}>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <Button
                  className="flex items-center justify-center"
                  type="submit"
                  variant="primary"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BioModal;
