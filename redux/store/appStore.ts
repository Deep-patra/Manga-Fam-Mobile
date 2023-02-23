import { configureStore } from "@reduxjs/toolkit";

import { themeReducer } from "../reducers/toggleMode.reducer";
import filterReducer from '../reducers/toggleFilter.reducer'
import mangaReducer from '../reducers/mangas.reducer'
import readMangaReducer from '../reducers/readManga.reducer'

const Store = configureStore({
  reducer: {
    theme: themeReducer,
    filter: filterReducer,
    manga: mangaReducer,
    readManga: readMangaReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export default Store