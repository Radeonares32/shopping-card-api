import express from 'express'
import chalk from 'chalk'
import http from 'http'
import cors  from 'cors'
import path from 'path'
const app = express()
const server = http.createServer(app)
app.use('/public', express.static(path.join(__dirname, '../public')))
app.use(cors({
    origin:'*',
    credentials:true
}))
app.use(express.json())

// Database 
import { DB } from './db/db'

import {HomeRoutes, UserRoute, AdminRoutes, ProductRoute} from './routes/routes'

// Admin Service imported
import {ProductService, UserServices} from './service/service'


app.use('/',HomeRoutes.getHome)

app.use('/user',
UserRoute.postUserRoute,
UserRoute.getTokenUser, 
UserRoute.updateUserRoute,
UserRoute.getUserToken,
)
app.use('/admin',
AdminRoutes.getAdminToken,
AdminRoutes.updateAdminRoute
)
app.use('/product',
    ProductRoute.postProduct,
    ProductRoute.getAllProduct,
    ProductRoute.postUpdateProduct,
    ProductRoute.deleteProduct,
    ProductRoute.getProductDetail,
    ProductRoute.postAdminProduct,
    ProductRoute.getAllProductAdmin,
    ProductRoute.getAdminProductDetail,
    ProductRoute.deleteAdminProduct,
    ProductRoute.addUserCategories,
    ProductRoute.allUserCategories,
    ProductRoute.deleteUserCategories,
    ProductRoute.allUserProduct,
    ProductRoute.postAddProductBasket,
    ProductRoute.deleteUserProductBasket,
    ProductRoute.adminProductAddBasket,
    ProductRoute.deleteAdminProductBasket,
    ProductRoute.productAddBasket,
    ProductRoute.postPayment
)

server.listen(3000,async ()=>{
    await DB.MongoConnection()
    console.log(chalk.blue('Server listening http://127.0.0.1:3000\n'))
    const adminMessage = await UserServices.createAdminUser()
    const userProduct = await ProductService.addUserProduct()
    console.log(chalk.blue( adminMessage.message))
    console.log(chalk.blue(userProduct.message))

})