import { createAction } from "@reduxjs/toolkit";

import { ThemeMode } from "../../types";

export const toggleMode = createAction("TOGGLE_MODE", (mode: ThemeMode) => ({
  payload: {
    mode,
  },
}));
