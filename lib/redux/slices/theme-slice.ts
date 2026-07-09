import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: "light", // Server-side fallback to avoid hydration mismatch
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("elevix_theme", state.mode);
      }
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("elevix_theme", action.payload);
      }
    },
    syncThemeFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("elevix_theme") as ThemeMode | null;
        if (saved === "light" || saved === "dark") {
          state.mode = saved;
        } else {
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          state.mode = prefersDark ? "dark" : "light";
        }
      }
    },
  },
});

export const { toggleTheme, setTheme, syncThemeFromStorage } = themeSlice.actions;
export default themeSlice.reducer;
