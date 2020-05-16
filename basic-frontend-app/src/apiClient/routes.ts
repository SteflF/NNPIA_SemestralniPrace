export const ProductController_GetProducts = `/products`
export const ProductController_GetProduct = (id: number) => `/product/${id}`
export const AddressController_GetAddress = (id: number) => `/user/address/${id}`
export const AddressController_UpdateAddress = (id: number) => `/user/address/${id}`
export const OrderCotroller_GetById = (id: number) => `/order/${id}`
export const OrderCotroller_GetByUserId = (id: number) => `/orders/${id}`
export const OrderItemController_GetByOrderId = (id: number) => `/orderitems/${id}`