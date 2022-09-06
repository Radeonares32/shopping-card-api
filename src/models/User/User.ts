
import mongoose, { Model } from 'mongoose'
import { IUser } from '../../types/User/user'
import { Schema, Types } from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'

const UserSchema: Schema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address:{
        type:String
    },
    password: {
        type: String,
        required: true
    },
    products: [{
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
    }],
    adminProduct:[{
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
    }],
    userProduct:[{
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
    }]}],
    buy: [{
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
    }],
    adminBuy:[{
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
    }],
    userProductbuy:[{
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
    }],
    cardName: {
        type:String
    },
    cvv: {
        type:Number
    },
    cardNumber: {
        type:String
    }

})
UserSchema.plugin(mongooseAutoPopulate)
export const User = mongoose.model<IUser>("User", UserSchema)
