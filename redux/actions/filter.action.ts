import { createAction } from "@reduxjs/toolkit";

export const toggleStatus = createAction('TOGGLE_STATUS', (status: string) => {
  return {
    payload: {
      status,
    }
  }
})

export const toggleRating = createAction("TOGGLE_RATING", (rating: string) => {
  return {
    payload: {
      rating,
    }
  }
})

export const toggleDemographic = createAction("TOGGLE_DEMOGRAPHIC", (demographic: string) => {
  return {
    payload: {
      demographic,
    }
  }
})

export const toggleGenre = createAction("TOGGLE_GENRE", (genre: string) => {
  return {
    payload: {
      genre
    }
  }
})

export const resetFilter = createAction("RESET_FILTER", () => {
  return {
    payload: {}
  }
})