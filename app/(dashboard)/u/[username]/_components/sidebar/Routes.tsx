"use client";

import React from "react";
import { usePathname } from "next/navigation";

const Routes = () => {
  const pathname = usePathname();

  return <div>Routes</div>;
};

export default Routes;
