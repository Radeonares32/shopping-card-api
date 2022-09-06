
import mongoose from 'mongoose'
import { IAdminProduct } from '../../types/Product/product'
import { Schema } from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
//Models
import { Category } from './Category'

const UserMiddleProductSchema: Schema = new Schema<IAdminProduct>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    quantity:{
        type:Number,
        required:true
    },
    category:[{
        ref:"UserCategory",
        type:mongoose.Types.ObjectId
    }]
})
UserMiddleProductSchema.plugin(mongooseAutoPopulate)
export const userMiddleProduct = mongoose.model<IAdminProduct>("userMiddleProduct", UserMiddleProductSchema)
