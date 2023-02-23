import { createReducer } from "@reduxjs/toolkit";
import { updateManga, pushManga } from "../actions/mangas.action";

import { Manga } from "../../repository/Mangadex";

interface State {
  mangas: Manga[]
}

const initialState: State = {
  mangas: []
}

const mangaReducer = createReducer(initialState, (builder) => {
  builder.addCase(pushManga, (state, action) => {
    const { mangas } = state
    const new_mangas = action.payload

    return { mangas: mangas.concat(new_mangas) }
  })

  builder.addCase(updateManga, (state, action) => {
    const mangas = action.payload

    return { mangas }
  })

})

export default mangaReducer