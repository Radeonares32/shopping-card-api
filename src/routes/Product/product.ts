import express from 'express'
const app = express.Router()
// Controllers
import { ProductControllers } from '../../controller/controller'

//Multer
import { upload } from '../../middleware/multer'


//Post Product Routes
export const postProduct = app.post('/addProduct',upload.single('image'),ProductControllers.postProduct)
export const postUpdateProduct = app.post('/updateProduct',upload.single('image'),ProductControllers.updateProduct)
export const postAdminProduct = app.post('/addProductAdmin',upload.single('image'),ProductControllers.postAdminProduct)
export const addUserCategories = app.post('/addUserCategories',ProductControllers.addUserCategories)
export const postAddProductBasket = app.post('/addUserProductBasket',ProductControllers.userProductAddBasket)
export const adminProductAddBasket = app.post('/adminProductAddBasket',ProductControllers.adminProductAddBasket)
export const productAddBasket = app.post('/productAddBasket',ProductControllers.productAddBasket)
export const postPayment = app.post("/postPayment",ProductControllers.postPayment)
//Get Product Routes
export const getAllProduct = app.get('/allProduct',ProductControllers.getAllProduct)
export const deleteProduct = app.get('/deleteProduct',ProductControllers.deleteProduct)
export const getProductDetail = app.get('/getProductDetail/:id',ProductControllers.getProductDetail)
export const getAllProductAdmin = app.get('/allAdminProduct',ProductControllers.getAllAdminProduct)
export const getAdminProductDetail = app.get('/getAdminProductDetail/:id',ProductControllers.getAdminProductDetail)
export const deleteAdminProduct = app.get('/deleteAdminProduct',ProductControllers.deleteAdminProduct)
export const allUserCategories = app.get('/allUserCategories',ProductControllers.allUserCategories)
export const deleteUserCategories = app.get('/deleteUserCategories',ProductControllers.deleteUserCategories)
export const allUserProduct = app.get('/allUserProduct',ProductControllers.allUserProduct)
export const deleteUserProductBasket = app.get('/deleteUserProductBasket/:id/:email',ProductControllers.deleteUserProductBasket)
export const deleteAdminProductBasket = app.get('/deleteAdminProductBasket/:id/:email',ProductControllers.deleteAdminProductBasket)
export const deleteProductBasket = app.get('/deleteProductBasket/:id/:email',ProductControllers.deleteProductBasket)