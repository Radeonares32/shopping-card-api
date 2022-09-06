
import mongoose from 'mongoose'
import { ICategory } from '../../types/Product/product'
import { Schema } from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
const CategorySchema: Schema = new Schema<Omit<ICategory, "price">>({
    title: {
        type: String,
        required: true
    },
    gram:{
        type:Number,
        required:true
    }
})
CategorySchema.plugin(mongooseAutoPopulate)
export const Category = mongoose.model<ICategory>("Category", CategorySchema)
