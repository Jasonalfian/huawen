import { LoginData } from "@/client/login";
import { create } from "zustand";
import { STUDENT_URL } from "./constant";

interface GlobalStore {
  token: string | null;
  loginData: LoginData | null;
  profilePicUrl: string | null;
  login: (newToken: string, loginData: LoginData) => void;
  logout: () => void;
  updateProfilePic: (url: string) => void;
  initializeToken: () => void;
}

// Create Zustand store with types
const useGlobalStore = create<GlobalStore>((set) => ({
  token: null,
  loginData: null,
  profilePicUrl: null,
  login: (newToken, loginData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("loginData", JSON.stringify(loginData));
    localStorage.setItem("profilePicUrl", loginData.profile_picture_url);
    set({ token: newToken });
    set({ loginData: loginData });
    set({ profilePicUrl: loginData.profile_picture_url });
    window.location.href = STUDENT_URL.HOME;
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
    window.location.href = "/";
  },
  updateProfilePic: (url: string) => {
    localStorage.setItem("profilePicUrl", url);
    set({ profilePicUrl: url });
  },
  initializeToken: () => {
    const storedToken = localStorage.getItem("token");
    const storedLoginData = localStorage.getItem("loginData");
    const storedProfilePicUrl = localStorage.getItem("profilePicUrl");

    if (storedToken && storedLoginData) {
      set({ token: storedToken });
      set({ loginData: JSON.parse(storedLoginData) }); // Parse loginData before setting it
      set({ profilePicUrl: storedProfilePicUrl });
    } else {
      // Redirect to login page if token or loginData doesn't exist
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
  },
}));

export default useGlobalStore;
