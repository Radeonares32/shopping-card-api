
import mongoose from 'mongoose'
import { ICategory } from '../../types/Product/product'
import { Schema } from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
const UserCategorySchema: Schema = new Schema<ICategory>({
    title: {
        type: String,
        required: true
    },
    gram:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})
UserCategorySchema.plugin(mongooseAutoPopulate)
export const UserCategory = mongoose.model<ICategory>("UserCategory", UserCategorySchema)
