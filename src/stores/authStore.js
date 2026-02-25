import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        currentUser: {},
        login: (user) => set({ isLoggedIn: true, currentUser: user }),
        logout: () => set({ isLoggedIn: false, currentUser: {} }),
        setCurrentUser: (user) => set({ currentUser: user }),
      }),
      {
        name: "auth-storage",
      },
    ),
  ),
);
