import { APIStateInterface } from "./apiState.interface";
import { FoodInterface } from "./food.interface";

export interface AppStateInterface {
    food: APIStateInterface;
    likedFood: FoodInterface[];
}