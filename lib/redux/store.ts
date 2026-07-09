import { configureStore } from "@reduxjs/toolkit";

import configReducer from "./slices/config-slice";
import themeReducer from "./slices/theme-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeReducer,
      config: configReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
