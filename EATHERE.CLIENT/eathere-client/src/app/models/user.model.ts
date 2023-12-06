export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    contactNumber: string;
    birthdayDate: string;
    isRestaurantOwner: boolean;
    restaurantId: string;
    salary?: string;
}