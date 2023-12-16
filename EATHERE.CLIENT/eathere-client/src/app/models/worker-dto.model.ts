export interface WorkerDto {
    id: string;
    name: string;
    surname: string;
    email: string;
    contactNumber: string;
    birthdayDate: string;
    isRestaurantOwner: boolean;
    restaurantId: string;
    salary?: string;
    registerDate: string;
}