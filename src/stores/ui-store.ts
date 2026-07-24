"use client";

import { create } from "zustand";

export type ToastTone = "default" | "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  tone?: ToastTone;
}

interface UiState {
  soundEnabled: boolean;
  sidebarOpen: boolean;
  chatOpen: boolean;
  toasts: Toast[];
  setSoundEnabled: (enabled: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setChatOpen: (open: boolean) => void;
  pushToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  soundEnabled: true,
  sidebarOpen: false,
  chatOpen: false,
  toasts: [],

  setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setChatOpen: (chatOpen) => set({ chatOpen }),

  pushToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { ...toast, id: `toast_${Date.now()}_${Math.random()}` },
      ].slice(-5),
    })),

  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
