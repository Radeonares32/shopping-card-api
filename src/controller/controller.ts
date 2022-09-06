import { getHome } from './Home/home'
import {
    getToken,
    postUser,
    getTokenUser,
    updateUser,
    getAdminToken,
    updateAdminUser
} from './User/user'

import {
    postProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    getProductDetail,
    postAdminProduct,
    getAllAdminProduct,
    getAdminProductDetail,
    deleteAdminProduct,
    addUserCategories,
    allUserCategories,
    deleteUserCategories,
    allUserProduct,
    userProductAddBasket,
    deleteUserProductBasket,
    adminProductAddBasket,
    deleteAdminProductBasket,
    productAddBasket,
    deleteProductBasket,
    postPayment
} from './Product/product'

export const AdminControllers = {
    getAdminToken,
    updateAdminUser
}

export const HomeControllers = {
    getHome
}
export const UserControllers = {
    getToken,
    postUser,
    getTokenUser,
    updateUser,
}
export const ProductControllers = {
    postProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    getProductDetail,
    postAdminProduct,
    getAllAdminProduct,
    getAdminProductDetail,
    deleteAdminProduct,
    addUserCategories,
    allUserCategories,
    deleteUserCategories,
    allUserProduct,
    userProductAddBasket,
    deleteUserProductBasket,
    adminProductAddBasket,
    deleteAdminProductBasket,
    productAddBasket,
    deleteProductBasket,
    postPayment
}
