import { createReducer } from "@reduxjs/toolkit";

import { toggleStatus, toggleRating, toggleGenre, toggleDemographic, resetFilter } from '../actions/filter.action'
import { Status, Genre, PublicationDemographic, ContentRating } from "../../repository/Mangadex/index";


interface State {
  status: Record<string, boolean>,
  genre: Record<string, boolean>,
  publicationDemographic: Record<string, boolean>,
  contentRating: Record<string, boolean>
}

const generateMap = (values: string[]): Record<string, boolean> => {
  const map: Record<string, boolean> = {}
  values.forEach((value: string) => { map[value as keyof {}] = false })
  return map
}

const initialState: State = {
  status: generateMap(Status),
  genre: generateMap([...Genre.keys()]),
  publicationDemographic: generateMap(PublicationDemographic),
  contentRating: generateMap(ContentRating),
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(toggleStatus, (state, action) => {
    const { status } = state
    const target = action.payload.status
    const new_status = { ...status }

    new_status[target] = !new_status[target]

    return { ...state, status: new_status }
  })

  builder.addCase(toggleGenre, (state, action) => {
    const { genre } = state
    const target = action.payload.genre
    const new_genre = { ...genre }

    new_genre[target] = !new_genre[target]
    return { ...state, genre: new_genre }
  })

  builder.addCase(toggleDemographic, (state, action) => {
    const { publicationDemographic } = state
    const target = action.payload.demographic
    const new_demographic = { ...publicationDemographic }

    new_demographic[target] = !new_demographic[target]
    return { ...state, publicationDemographic: new_demographic }
  })

  builder.addCase(toggleRating, (state, action) => {
    const { contentRating } = state
    const target = action.payload.rating
    const new_rating = { ...contentRating }

    new_rating[target] = !new_rating[target]
    return { ...state, contentRating: new_rating }
  })

  builder.addCase(resetFilter, (state, action) => {
    return { ...initialState }
  })

})

export default reducer