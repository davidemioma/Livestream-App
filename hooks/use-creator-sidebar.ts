import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SidebarState {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

const useCreatorSidebar = create<SidebarState>()(
  persist(
    (set) => ({
      collapsed: false,
      onExpand: () => set({ collapsed: false }),
      onCollapse: () => set({ collapsed: true }),
    }),
    {
      name: "live-stream-creator-sidebar",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCreatorSidebar;
