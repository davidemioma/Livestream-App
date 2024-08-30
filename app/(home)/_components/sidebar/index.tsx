import React from "react";
import Toggle from "./Toggle";
import Wrapper from "./Wrapper";
import Empty from "@/components/Empty";
import { getRecommended } from "@/lib/data/recommended";
import Recommended, { RecommendedSkeleton } from "./Recommended";

const SideBar = async () => {
  const recommended = await getRecommended();

  return (
    <Wrapper>
      <Toggle />

      <div className="space-y-4 pt-4 lg:pt-0">
        {recommended.length > 0 ? (
          <Recommended recommended={recommended} />
        ) : (
          <Empty sidebar />
        )}
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 z-50 h-full w-[70px] border-r border-t bg-background pt-6 dark:border-[#2d2e35] dark:bg-[#252731] lg:w-60">
      <RecommendedSkeleton />
    </aside>
  );
};

export default SideBar;
