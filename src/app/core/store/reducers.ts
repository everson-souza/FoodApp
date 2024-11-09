// Define how our actions change our state
import { createReducer, on } from "@ngrx/store";
import { APIStateInterface } from "../models/apiState.interface";
import * as FoodActions from './actions'

export const initialState: APIStateInterface = {
    isLoading: false,
    data: null,
    error: null,
    likedFoods: [],  
}

export const reducers = createReducer(
    initialState, 
    on(FoodActions.getFood, (state) => ({...state, isLoading: true})),
    
    on(FoodActions.getFoodSuccess, (state, action) => ({
        ...state, 
        isLoading: false, 
        data: action.food
    })),

    on(FoodActions.getFoodFailure, (state, action) => ({
        ...state, 
        isLoading: false, 
        error: action.error
    })),

    on(FoodActions.addLikedFood, (state, { likedFood }) => ({
        ...state,
        likedFoods: [...state.likedFoods, likedFood]
      })),
    
    on(FoodActions.clearLikedFoods, state => ({
        ...state,
        likedFoods: []
    }))
);

