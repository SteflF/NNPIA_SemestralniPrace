export interface IProductItem {
    id: number,
    name: string,
    price: number,
    description: string,
    photo: string,
    category: string
}

export interface ILocalProduct {
    id: number,
    name: string,
    price: number,
    count: number,
    photo: string
}

export interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    address: IUserAddress
}

export interface IUserAddress {
    id: number,
    city: string,
    street: string,
    psc: string,
    country: string
}

export interface IOrder {
    id: number,
    userId: number,
    payment: string,
    state: string,
    deliveryMethod: string
}

export interface IOrderItem {
    id: number,
    product: IProductItem,
    orderId: number,
    price: number,
    count: number
}