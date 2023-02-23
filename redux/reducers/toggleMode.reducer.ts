import { createReducer } from "@reduxjs/toolkit";
import type { ThemeMode } from "../../types";

import { toggleMode } from "../actions/mode.action";

interface State {
  mode: ThemeMode;
}

const initialState: State = {
  mode: "light",
};

export const themeReducer = createReducer(initialState, (builder) => {
  builder.addCase(toggleMode, (state: State, action) => ({
    mode: action.payload.mode === "light" ? "light" : "dark",
  }));
});
