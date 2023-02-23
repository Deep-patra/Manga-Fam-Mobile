import { createAction } from "@reduxjs/toolkit";
import { Manga } from "../../repository/Mangadex";

export const updateManga = createAction("UPDATE_MANGA", (mangas: Manga[]) => {
  return {
    payload: mangas
  }
})

export const pushManga = createAction("PUSH_MANGA", (mangas: Manga[]) => {
  return { 
    payload: mangas
  }
})