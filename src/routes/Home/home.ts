import express,{ Handler } from "express";
const app = express.Router()

// Controllers
import { HomeControllers } from '../../controller/controller'

export const getHome = app.get('/',HomeControllers.getHome)
