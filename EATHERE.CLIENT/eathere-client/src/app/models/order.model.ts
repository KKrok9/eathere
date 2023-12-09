
export interface Order {
    id: string;
    orderAccepterId: string;
    tableId: string;
    restaurantId: string;
    description?: string;
    orderStatus: string;
    dishIds: string[];
    orderDate: Date;
}