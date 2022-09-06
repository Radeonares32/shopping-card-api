
import mongoose from 'mongoose'
import { IAdminProduct } from '../../types/Product/product'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import { Schema } from 'mongoose'
//Models
import { Category } from './Category'

const UserProductSchema: Schema = new Schema<IAdminProduct>({
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
UserProductSchema.plugin(mongooseAutoPopulate)
export const userProduct = mongoose.model<IAdminProduct>("userProduct", UserProductSchema)
