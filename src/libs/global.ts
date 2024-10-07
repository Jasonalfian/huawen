import { LoginData } from "@/client/login";
import { create } from "zustand";
import {
  FORGOT_PASSWORD_URL,
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
  lang: string;
  login: (newToken: string, loginData: LoginData) => void;
  logout: () => void;
  updateProfilePic: (url: string) => void;
  updateLanguage: (lang: string) => void;
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
  lang: "en",
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
    return;
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginData");
    set({ token: null });
    window.location.href = ROOT;
  },
  updateProfilePic: (url: string) => {
    localStorage.setItem("profilePicUrl", url);
    set({ profilePicUrl: url });
  },
  updateLanguage: (lang: string) => {
    localStorage.setItem("lang", lang);
    set({ lang: lang });
  },
  initializeToken: () => {
    const pathname = window.location.pathname;
    const storedToken = getLocalStorageItem("token");
    const storedLoginData = getLocalStorageItem("loginData");
    const storedProfilePicUrl = getLocalStorageItem("profilePicUrl");
    const storedLanguage = getLocalStorageItem("lang");

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
          return;
        }
      }
    }

    if (storedLanguage) {
      set({ lang: storedLanguage });
    } else {
      set({ lang: "en" });
    }

    if (storedToken && storedLoginData) {
      set({ token: storedToken });
      set({ loginData: JSON.parse(storedLoginData) }); // Parse loginData before setting it
      set({ profilePicUrl: storedProfilePicUrl });
    } else {
      // Redirect to login page if token or loginData doesn't exist
      if (
        window.location.pathname !== ROOT &&
        !pathname.startsWith(FORGOT_PASSWORD_URL)
      ) {
        window.location.href = ROOT;
        return;
      }
    }
  },
}));

export default useGlobalStore;
