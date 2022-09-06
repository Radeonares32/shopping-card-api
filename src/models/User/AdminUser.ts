
import mongoose, { Model } from 'mongoose'
import { IAdminUser } from '../../types/User/user'
import { Schema, Types } from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
const AdminUserSchema:Schema = new Schema<IAdminUser>({
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    stripeSecretKey:{
        type:String,
        required:true
    }

})
AdminUserSchema.plugin(mongooseAutoPopulate)
export const AdminUser =  mongoose.model<IAdminUser>("AdminUser",AdminUserSchema)
