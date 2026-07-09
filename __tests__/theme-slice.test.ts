import themeReducer, { ThemeMode, setTheme, toggleTheme } from "../lib/redux/slices/theme-slice";

describe("theme slice reducer", () => {
  it("should return the initial state", () => {
    expect(themeReducer(undefined, { type: "unknown" })).toEqual({
      mode: "light",
    });
  });

  it("should handle toggleTheme from light to dark", () => {
    const initialState = { mode: "light" as ThemeMode };
    const actual = themeReducer(initialState, toggleTheme());
    expect(actual.mode).toEqual("dark");
  });

  it("should handle toggleTheme from dark to light", () => {
    const initialState = { mode: "dark" as ThemeMode };
    const actual = themeReducer(initialState, toggleTheme());
    expect(actual.mode).toEqual("light");
  });

  it("should handle setTheme to a specific mode", () => {
    const initialState = { mode: "light" as ThemeMode };
    const actual = themeReducer(initialState, setTheme("dark"));
    expect(actual.mode).toEqual("dark");
  });
});
