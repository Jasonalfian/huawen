import { LoginData } from "@/client/login";
import { create } from "zustand";
import {
  ROLE_STUDENT,
  ROLE_TEACHER,
  ROOT,
  STUDENT_URL,
  TEACHER_URL,
} from "./constant";

interface GlobalStore {
  token: string | null;
  loginData: LoginData | null;
  profilePicUrl: string | null;
  login: (newToken: string, loginData: LoginData) => void;
  logout: () => void;
  updateProfilePic: (url: string) => void;
  initializeToken: () => void;
}

const getLocalStorageItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item === "null" || item === "undefined" ? null : item;
};

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

    if (loginData.role == ROLE_STUDENT) {
      window.location.href = STUDENT_URL.HOME;
      return;
    }
    window.location.href = TEACHER_URL.HOME;
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
    const pathname = window.location.pathname;

    if (pathname === ROOT) {
      return;
    }

    const storedToken = getLocalStorageItem("token");
    const storedLoginData = getLocalStorageItem("loginData");
    const storedProfilePicUrl = getLocalStorageItem("profilePicUrl");

    const parsedLoginData = storedLoginData
      ? JSON.parse(storedLoginData)
      : null;

    if (parsedLoginData && parsedLoginData.role) {
      const role = parsedLoginData.role;
      if (!pathname.toLowerCase().includes(role.toLowerCase())) {
        if (role === ROLE_STUDENT) {
          window.location.href = STUDENT_URL.HOME;
          return;
        }

        if (role === ROLE_TEACHER) {
          window.location.href = TEACHER_URL.HOME;
        }
      }
    }

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
