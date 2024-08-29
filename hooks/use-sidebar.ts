import { create } from "zustand";

interface Props {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

const useSidebar = create<Props>((set) => ({
  collapsed: false,
  onExpand: () => set({ collapsed: false }),
  onCollapse: () => set({ collapsed: true }),
}));

export default useSidebar;
