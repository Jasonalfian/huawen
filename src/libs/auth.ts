import { create } from "zustand";

// Define the type for your store
interface AuthStore {
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
  initializeToken: () => void;
}

// Create Zustand store with types
const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  login: (newToken) => {
    localStorage.setItem("token", newToken);
    set({ token: newToken });
    window.location.href = "/home";
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
    window.location.href = "/";
  },
  initializeToken: () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      set({ token: storedToken });
    } else {
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
  },
}));

export default useAuthStore;
