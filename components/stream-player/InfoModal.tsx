"use client";

import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import FileUpload from "./FileUpload";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { updateStream } from "@/lib/actions/stream";
import { zodResolver } from "@hookform/resolvers/zod";
import { StreamSchema, StreamValidator } from "@/lib/validators/stream";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
  initialName: string;
  initialThumbnail: string | null;
};

const InfoModal = ({ initialName, initialThumbnail }: Props) => {
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<StreamValidator>({
    resolver: zodResolver(StreamSchema),
    defaultValues: {
      name: initialName,
      thumbnailUrl: initialThumbnail || "",
    },
  });

  const onSubmit = (values: StreamValidator) => {
    startTransition(() => {
      updateStream(values)
        .then(() => {
          toast.success("Stream updated successfully");

          setOpen(false);
        })
        .catch((error) => {
          toast.error("Something went wrong! Unable to update stream.");
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
          <DialogTitle>Edit</DialogTitle>

          <DialogDescription>Customise your stream details.</DialogDescription>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Stream Name..."
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thumbnailUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>

                    <FormControl>
                      <FileUpload {...field} disabled={isPending} />
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

export default InfoModal;
