import { Document,Types } from 'mongoose'
import { IProduct,IAdminProduct } from '../Product/product'

export interface IUser extends Document {
    firstName:string
    lastName:string
    email:string
    password:string,
    address:string,
    products:{
        type:Types.ObjectId,
        ref:string
    },
    adminProduct:{
      type:Types.ObjectId,
      ref:string
    },
    userProduct: [IProduct],
    buy:{
      type:Types.ObjectId,
      ref:string
    },
    adminBuy:{
        type:Types.ObjectId,
        ref:string
    },
    userProductbuy:{
        type:Types.ObjectId,
        ref:string
    },
    cardName:string,
    cvv:number,
    cardNumber:string
}
export interface IAdminUser extends Document {
  email:string,
  password:string,
  stripeSecretKey:string
}
