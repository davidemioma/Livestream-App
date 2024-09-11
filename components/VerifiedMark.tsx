import { Check } from "lucide-react";
import React from "react";

const VerifiedMark = () => {
  return (
    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white">
      <Check className="h-2.5 w-2.5 stroke-[4px]" />
    </div>
  );
};

export default VerifiedMark;
