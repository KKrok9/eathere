export interface Dish {
    id: string;
    name: string;
    ingredients: string;
    description: string;
    price: number;
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
    portionTypeId: string;
    dishTypeId: string;
    restaurantId: string;
}