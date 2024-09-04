"use client";

import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IngressInput } from "livekit-server-sdk";
import { createIngress } from "@/lib/actions/ingress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const RTMP = String(IngressInput.RTMP_INPUT);

const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

const ConnectModal = () => {
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const [ingressType, setIngressType] = useState<IngressType>(RTMP);

  const onClick = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success("Ingress created");

          setOpen(false);
        })
        .catch((err) => {
          toast.error("Something went wrong! Failed to create ingress");
        });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">Generate</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Connection</DialogTitle>
        </DialogHeader>

        <Select
          value={ingressType}
          onValueChange={(value) => setIngressType(value as IngressType)}
          disabled={isPending}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>

            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>

        <Alert>
          <AlertTriangle className="h-4 w-4" />

          <AlertTitle>Warning!</AlertTitle>

          <AlertDescription>
            This action will reset all active streams using the current
            connection.
          </AlertDescription>
        </Alert>

        <div className="flex items-center justify-end gap-3">
          <DialogClose asChild disabled={isPending}>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button variant="primary" onClick={onClick} disabled={isPending}>
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectModal;
