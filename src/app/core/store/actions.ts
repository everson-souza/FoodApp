// Represent a specific event or change in the application

import { createAction, props } from "@ngrx/store";
import { FoodInterface } from "../models/food.interface";
import { APIInterface } from "../models/api.interface";

export const getFood = createAction('[Food] Get Food')

export const getFoodSuccess = createAction
('[Food] Get Food success',
    props<{food: any}>()
);

export const getFoodFailure = createAction
('[Food] Get Food failure',
    props<{error: string}>()
);

export const addLikedFood = createAction(
    '[Food] Add Liked Food',
    props<{ likedFood: FoodInterface }>()
  );
  
export const clearLikedFoods = createAction('[Food] Clear Liked Foods');