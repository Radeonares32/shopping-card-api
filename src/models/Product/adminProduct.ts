
import mongoose from 'mongoose'
import { IAdminProduct } from '../../types/Product/product'
import { Schema } from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
//Models
import { Category } from './Category'

const adminProductSchema: Schema = new Schema<IAdminProduct>({
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
        required: true
    },
    quantity:{
        type:Number,
        required:true
    },
    category:[{
        title: {
            type: String,
            required: true
        },
        gram:{
            type:Number,
            required:true
        }
    }]
})
adminProductSchema.plugin(mongooseAutoPopulate)
export const adminProduct = mongoose.model<IAdminProduct>("adminProduct", adminProductSchema)
