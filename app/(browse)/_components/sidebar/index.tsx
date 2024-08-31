import React from "react";
import Toggle from "./Toggle";
import Wrapper from "./Wrapper";
import Empty from "@/components/Empty";
import { getFollowedUsers } from "@/lib/data/user";
import { getRecommended } from "@/lib/data/recommended";
import Following, { FollowingSkeleton } from "./Following";
import Recommended, { RecommendedSkeleton } from "./Recommended";

const SideBar = async () => {
  const recommended = await getRecommended();

  const followedUsers = await getFollowedUsers(10);

  return (
    <Wrapper>
      <Toggle />

      <div className="space-y-10 pt-4 lg:pt-0">
        {followedUsers.length > 0 && <Following data={followedUsers} />}

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
    <aside className="fixed left-0 z-50 h-full w-[70px] space-y-5 border-r border-t bg-background pt-6 dark:border-[#2d2e35] dark:bg-[#252731] lg:w-60">
      <FollowingSkeleton />

      <RecommendedSkeleton />
    </aside>
  );
};

export default SideBar;
