"use client";

import React from "react";
import useSidebar from "@/hooks/use-sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from "lucide-react";
import CustomToolTip from "@/components/CustomToolTip";

const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useSidebar();

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed ? (
        <div className="mb-4 hidden items-center justify-center pt-4 md:flex">
          <CustomToolTip label="Expand" asChild side="right">
            <Button className="p-2" variant="ghost" onClick={onExpand}>
              <ArrowRightFromLineIcon className="h-4 w-4" />
            </Button>
          </CustomToolTip>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 pl-6">
          <span className="text-semibold text-sm">For you</span>

          <CustomToolTip label="Collapse" asChild side="right">
            <Button className="p-2" variant="ghost" onClick={onCollapse}>
              <ArrowLeftFromLineIcon className="h-4 w-4" />
            </Button>
          </CustomToolTip>
        </div>
      )}
    </>
  );
};

export default Toggle;
