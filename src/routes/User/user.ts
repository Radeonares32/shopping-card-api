import express from 'express'
const app = express.Router()
// Controllers
import { UserControllers,AdminControllers } from '../../controller/controller'


//Post User Routes
export const postUserRoute = app.post('/postUser',UserControllers.postUser)
export const updateUserRoute = app.post('/updateUser',UserControllers.updateUser)
//Get User Routes
export const getTokenUser = app.get('/getTokenUser',UserControllers.getTokenUser)
export const getUserToken = app.get('/getUserToken/:email/:password',UserControllers.getToken)

//Get Admin User Routes
export const getAdminToken = app.get('/getAdminToken',AdminControllers.getAdminToken)
//Post Admin User Routes
export const updateAdminRoute = app.post('/updateAdmin',AdminControllers.updateAdminUser)