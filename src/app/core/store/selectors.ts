// Selectors are pure functions used to retrieve specific pieces of state.

import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../models/appState.interface"

export const selectFeature = (state:AppStateInterface) => state.food;

export const isLoadingSelector = createSelector(
    selectFeature,
    (state) => state.isLoading
)

export const foodSelector = createSelector(
    selectFeature,
    (state) => state.data
)

export const likedFoodSelector = createSelector(
    selectFeature,
    (state) => state.likedFoods
)

export const errorSelector = createSelector(
    selectFeature,
    (state) => state.error
)
