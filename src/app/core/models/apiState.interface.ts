import { APIInterface } from "./api.interface";
import { FoodInterface } from "./food.interface";

export interface APIStateInterface{
    isLoading: boolean;
    data: APIInterface | null;
    error: string | null;
    likedFoods: FoodInterface[];
}