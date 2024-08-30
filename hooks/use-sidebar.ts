import { create } from "zustand";

interface SidebarState {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

const getInitialState = (): boolean => {
  const stored = localStorage.getItem("live-stream-app-sidebar");

  return stored === "true";
};

const useSidebar = create<SidebarState>()((set) => ({
  collapsed: getInitialState(),
  onExpand: () => {
    set({ collapsed: false });

    localStorage.setItem("live-stream-app-sidebar", "false");
  },
  onCollapse: () => {
    set({ collapsed: true });

    localStorage.setItem("live-stream-app-sidebar", "true");
  },
}));

export default useSidebar;
