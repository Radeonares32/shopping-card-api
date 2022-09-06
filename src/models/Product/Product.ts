
import mongoose from 'mongoose'
import { IProduct } from '../../types/Product/product'
import { Schema } from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
const ProductSchema: Schema = new Schema<IProduct>({
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
    }
})
ProductSchema.plugin(mongooseAutoPopulate)
export const Product = mongoose.model<IProduct>("Product", ProductSchema)
