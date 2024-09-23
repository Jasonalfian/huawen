import { create } from "zustand";

type LessonInfo = {
  lesson_name: string;
  lesson_time: string;
  teachers: string;
};

interface GlobalStore {
  token: string | null;
  lessonInfo: LessonInfo;
  login: (newToken: string) => void;
  logout: () => void;
  initializeToken: () => void;
}

// Create Zustand store with types
const useGlobalStore = create<GlobalStore>((set) => ({
  token: null,
  lessonInfo: {
    lesson_name: "",
    lesson_time: "",
    teachers: "",
  },
  setLessonInfo: (lessonInfo: LessonInfo) => {
    set({ lessonInfo: lessonInfo });
  },
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

export default useGlobalStore;
