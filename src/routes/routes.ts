import {
    getHome
} from './Home/home'

import {
    getUserToken,
    postUserRoute,
    getTokenUser,
    updateUserRoute,
    getAdminToken,
    updateAdminRoute
} from './User/user'

import {
    postProduct,
    getAllProduct,
    postUpdateProduct,
    deleteProduct,
    getProductDetail,
    postAdminProduct,
    getAllProductAdmin,
    getAdminProductDetail,
    deleteAdminProduct,
    addUserCategories,
    allUserCategories,
    deleteUserCategories,
    allUserProduct,
    postAddProductBasket,
    deleteUserProductBasket,
    adminProductAddBasket,
    deleteAdminProductBasket,
    productAddBasket,
    deleteProductBasket,
    postPayment
} from './Product/product'

export const AdminRoutes = {
    getAdminToken,
    updateAdminRoute
}

export const HomeRoutes = {
    getHome
}
export const UserRoute = {
    getUserToken,
    postUserRoute,
    getTokenUser,
    updateUserRoute
}
export const ProductRoute = {
    postProduct,
    getAllProduct,
    postUpdateProduct,
    deleteProduct,
    getProductDetail,
    postAdminProduct,
    getAllProductAdmin,
    getAdminProductDetail,
    deleteAdminProduct,
    addUserCategories,
    allUserCategories,
    deleteUserCategories,
    allUserProduct,
    postAddProductBasket,
    deleteUserProductBasket,
    adminProductAddBasket,
    deleteAdminProductBasket,
    productAddBasket,
    deleteProductBasket,
    postPayment
}