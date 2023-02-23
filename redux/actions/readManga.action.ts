import { createAction } from "@reduxjs/toolkit";
import { Manga } from "../../repository/Mangadex";
import ReadManga from "../../storage/readManga";

export const setReadMangas = createAction("SET_READ_MANGA", (mangas: ReadManga[]) => {
  return { 
    payload: {
      mangas,
    }
  }
})

export const updateChapterBeingRead = createAction("UPDATE_CHAPTER_BEING_READ", (manga: Manga, chapterID: string) => {
  return {
    payload: {
      manga,
      chapterID,
    }
  }
})

export const toggleMangaInLibrary = createAction("TOGGLE_MANGA_IN_LIBRARY", (manga: Manga) => {
  return {
    payload: {
      manga,
    }
  }
})