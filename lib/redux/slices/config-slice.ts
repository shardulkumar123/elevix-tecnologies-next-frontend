import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ConfigState {
  appName: string;
  userName: string;
}

const initialState: ConfigState = {
  appName: "Elevix Technologies",
  userName: "Guest",
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    updateAppName: (state, action: PayloadAction<string>) => {
      if (action.payload.trim()) {
        state.appName = action.payload;
      }
    },
    updateUserName: (state, action: PayloadAction<string>) => {
      if (action.payload.trim()) {
        state.userName = action.payload;
      }
    },
  },
});

export const { updateAppName, updateUserName } = configSlice.actions;
export default configSlice.reducer;
