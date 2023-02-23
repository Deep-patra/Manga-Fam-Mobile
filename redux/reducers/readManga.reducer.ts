import { createReducer } from '@reduxjs/toolkit';

import ReadManga from '../../storage/readManga';
import Storage from '../../storage';

import {
  setReadMangas,
  updateChapterBeingRead,
  toggleMangaInLibrary,
} from '../actions/readManga.action';

interface State {
  mangas: ReadManga[];
}

const initialState: State = {
  mangas: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setReadMangas, (state, { payload }) => {
    const { mangas } = payload;
    return { mangas };
  });

  builder.addCase(updateChapterBeingRead, (state, { payload }) => {
    const { manga, chapterID } = payload;
    const foundIndex = state.mangas.findIndex((value) => value.mangaID === manga.id)
    let new_mangas = []

    if (foundIndex === -1) {
      const new_manga = new ReadManga(manga.id, manga.getTitle(), manga.relationships, false, chapterID)

      new_mangas = state.mangas.concat(new_manga)
    } else {
      state.mangas[foundIndex].updateChapterBeingRead(chapterID)
      new_mangas = [ ...state.mangas ]
    }

    Storage.setReadMangas(new_mangas).catch(err => {}) // store the mangas in storage
    return { mangas: new_mangas}
  });

  builder.addCase(toggleMangaInLibrary, (state, { payload }) => {
    const { manga } = payload;
    const foundIndex = state.mangas.findIndex((value) => value.mangaID === manga.id);
    let new_mangas = []

    if (foundIndex === -1) {
      const new_manga = new ReadManga(
        manga.id,
        manga.getTitle(),
        manga.relationships,
        true,
      );

      new_mangas = state.mangas.concat(new_manga)
    } else {
      state.mangas[foundIndex].inLibrary ? 
      state.mangas[foundIndex].removeFromLibrary() : state.mangas[foundIndex].addToLibrary()

      new_mangas = [ ...state.mangas ]
    }
    Storage.setReadMangas(new_mangas).catch(err => {}) // store the mangas in the storage
    return { mangas: new_mangas}
  });
});

export default reducer;
