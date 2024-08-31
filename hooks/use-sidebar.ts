import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SidebarState {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

const useSidebar = create<SidebarState>()(
  persist(
    (set) => ({
      collapsed: false,
      onExpand: () => set({ collapsed: false }),
      onCollapse: () => set({ collapsed: true }),
    }),
    {
      name: "live-stream-sidebar",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useSidebar;
