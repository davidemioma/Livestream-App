import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}

interface SidebarState {
  collapsed: boolean;
  variant: ChatVariant;
  onExpand: () => void;
  onCollapse: () => void;
  onVariantChange: (variant: ChatVariant) => void;
}

const useChatSidebar = create<SidebarState>()(
  persist(
    (set) => ({
      collapsed: false,
      variant: ChatVariant.CHAT,
      onExpand: () => set({ collapsed: false }),
      onCollapse: () => set({ collapsed: true }),
      onVariantChange: (variant) => set({ variant }),
    }),
    {
      name: "live-stream-chat-sidebar",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useChatSidebar;
