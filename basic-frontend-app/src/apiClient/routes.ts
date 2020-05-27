export const ProductController_GetProducts = (pageNumber: number, pageSize: number, sortBy: string, sortAsc: boolean,) => `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortAsc=${sortAsc}`
export const ProductController_GetProductsByCategory = (category: string, pageNumber: number, pageSize: number, sortBy: string, sortAsc: boolean,) => `/products/${category}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortAsc=${sortAsc}`
export const ProductController_GetProductsBySearchString = (searchString: string, pageNumber: number, pageSize: number, sortBy: string, sortAsc: boolean,) => `/products/search?searchString=${searchString}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortAsc=${sortAsc}`
export const ProductController_GetProduct = (id: number) => `/product/${id}`
export const AddressController_GetAddress = (id: number) => `/user/address/${id}`
export const AddressController_UpdateAddress = (id: number) => `/user/address/${id}`
export const OrderCotroller_GetById = (id: number) => `/order/${id}`
export const OrderCotroller_GetByUserId = (id: number) => `/orders/${id}`
export const OrderItemController_GetByOrderId = (id: number) => `/orderitems/${id}`
export const OrderItemController_AddProductItem = (id: number) => `/orderitem/add/${id}`