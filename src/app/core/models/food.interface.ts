import { FoodAttributesInterface } from "./foodAttributes.interface";
import { FoodCategoryInterface } from "./foodCategory.interface";
import { ImageSetInterface } from "./imageSet.interface";

export interface FoodInterface {
    id: string;
    name: string;
    manufacturer: string;
    shortDescription: string;
    description: string;
    price: number;
    princingRule: string;
    attributes: FoodAttributesInterface[];
    imageSet: ImageSetInterface[];
    isDigital: boolean;
    quantity: number;
    category: FoodCategoryInterface;
    subCategory: FoodCategoryInterface
}


