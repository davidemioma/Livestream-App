"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { CheckCheck, Copy } from "lucide-react";

type Props = {
  value?: string;
};

const CopyBtn = ({ value }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!value) return;

    setIsCopied(true);

    navigator.clipboard.writeText(value);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button
      className="disabled:cursor-not-allowed"
      onClick={handleCopy}
      variant="ghost"
      size="icon"
      disabled={isCopied || !value}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};

export default CopyBtn;
