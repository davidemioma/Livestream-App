"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import CustomToolTip from "@/components/CustomToolTip";
import useCreatorSidebar from "@/hooks/use-creator-sidebar";
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from "lucide-react";

const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useCreatorSidebar();

  return (
    <>
      {collapsed ? (
        <div className="mb-4 hidden items-center justify-center pt-4 lg:flex">
          <CustomToolTip label="Expand" asChild side="right">
            <Button className="p-2" variant="ghost" onClick={onExpand}>
              <ArrowRightFromLineIcon className="h-4 w-4" />
            </Button>
          </CustomToolTip>
        </div>
      ) : (
        <div className="mb-2 hidden items-center justify-between p-3 pl-6 lg:flex">
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
