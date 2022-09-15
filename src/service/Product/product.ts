import fs from 'fs'
import { Stripe } from 'stripe'
import { Product } from '../../models/Product/Product'
import { UserCategory } from '../../models/Product/UserCategory'
import { userProduct } from '../../models/Product/UserProduct'
import { adminProduct } from '../../models/Product/adminProduct'

//Config
import { Config } from '../../config/config'
import { AdminUser } from "../../models/User/AdminUser";
import { User } from "../../models/User/User";
Config.DotenvConfig()
export const addProduct = async (title: string, description: string, image: any, price: number, quantity: number) => {
    const isProduct = await findProduct(title)
    if ((await isProduct).length > 0) {
        return {
            message: "Product already"
        }
    } else {
        const product = await Product.create({ title, description, image, price, quantity })
        await product.save()
        return {
            message: "Product Created"
        }
    }
}
export const findProduct = async (title: string) => {
    return Product.find({ title })
}
export const updateProduct = async (id: string, title: string, description: string, image: string | undefined, price: number, quantity: number) => {
    if (image !== undefined) {
        const product = await findProduct(title)
        const oldImage = product[0].image
        await fs.rmSync(process.cwd() + process.env.UPLOADS_DIR + '/' + oldImage)
        await Product.updateOne({ _id: id }, { title, description, image, price, quantity })
    }
    else {
        await Product.updateOne({ _id: id }, { title, description, price, quantity })
    }
}
export const allProduct = async () => {
    return Product.find()
}

export const deleteProduct = async (id: string) => {
    const product = await Product.find({ _id: id })
    const oldImage = product[0].image
    await fs.rmSync(process.cwd() + process.env.UPLOADS_DIR + '/' + oldImage)
    await Product.deleteOne({ _id: id })
}
export const findByIdProduct = async (id: string) => {
    return Product.find({ _id: id })
}
export const findAdminProduct = async (title: string) => {
    return adminProduct.find({ title })
}

export const adminProductAdd = async (title: string, description: string, image: string | undefined, price: number, quantity: number, category: any[]) => {
    const isAdminProduct = await findAdminProduct(title)
    if ((await isAdminProduct).length > 0) {
        return {
            message: "Product already"
        }
    }
    else {
        const adProduct = await adminProduct.create({ title, description, image, price, quantity, category })
        await adProduct.save()
        return {
            message: "Admin product created"
        }
    }
}
export const allAdminProduct = async () => {
    return adminProduct.find()
}
export const findByIdAdminProduct = async (id: string) => {
    return adminProduct.findById(id)
}
export const deleteAdminProduct = async (id: string) => {
    const product = await adminProduct.find({ _id: id })
    const oldImage = product[0].image
    await fs.rmSync(process.cwd() + process.env.UPLOADS_DIR + '/' + oldImage)
    await adminProduct.deleteOne({ _id: id })
}
export const addUserProduct = async () => {
    const isUserProduct = await userProduct.find()
    if ((await isUserProduct).length > 0) {
        return {
            message: "Already user product"
        }
    }
    else {
        const Product = await userProduct.create({ title: "title", description: "description", image: "default.jpg", price: 0, quantity: 1 })
        await Product.save()
        return {
            message: "user product created"
        }
    }
}

export const findUserProduct = async (title: string) => {
    return userProduct.find({ title }).populate({
        path:"category"
    })
}
export const allUserProduct = async () => {
    return userProduct.find().populate({
        path:"category"
    })
}
export const updateUserProduct = async (id: string, title: string, description: string, image: string | undefined, price: number, quantity: number, category: any) => {
    const product = await findUserProduct(title)
    if (image !== undefined) {
        const oldImage = product[0].image
        await fs.rmSync(process.cwd() + process.env.UPLOADS_DIR + '/' + oldImage)
        await userProduct.updateOne({ _id: id }, { title, description, image, price, quantity })
    }
    else {
        await userProduct.updateOne({ _id: id }, { title, description, price, quantity })
    }
}
export const deleteUserProduct = async (id: string) => {
    const product = await userProduct.find({ _id: id })
    const oldImage = product[0].image
    await fs.rmSync(process.cwd() + process.env.UPLOADS_DIR + '/' + oldImage)
    await userProduct.deleteOne({ _id: id })
}

export const findUserCategory = async (title: string) => {
    return UserCategory.find({ title })
}

export const addUserCategory = async (title: string, gram: number, price: number) => {
    const isUserCategory = await findUserCategory(title)
    const product = await userProduct.find()
    if ((await isUserCategory).length > 0) {
        return {
            message: "Already user category"
        }
    }
    else {
        const userCategory = await UserCategory.create({ title, gram, price })
        const isCategory = await findUserCategory(title)
        await product[0].category.push(isCategory[0])
        await product[0].save()
        await userCategory.save()
        return {
            message: "User category created"
        }
    }
}
export const allUserCategory = async () => {
    return UserCategory.find()
}
export const deleteUserCategory = async (id: string) => {
    const product = await userProduct.find()
    const category: any = await UserCategory.findById(id)
    await userProduct.updateOne({ title: product[0].title }, {
        $pullAll: {
            category: [category._id]
        }
    }).exec()
    await UserCategory.deleteOne({ _id: id })
}
export const userProductAddBasket = async (id: string, email: string, quantity: number, price: number,description:string) => {
    let sum = 0;
    let prevSum = 0
   
    const uProduct = await userProduct.findById(id).populate("category")
    const isUserProductBasket = await User.find({ "userProduct._id": id })
    if ((await isUserProductBasket).length > 0) {
       // 1000
       
        sum = isUserProductBasket[0].userProduct[0].price/isUserProductBasket[0].userProduct[0].quantity  * quantity

         
        
        
        await User.updateOne({ email, "userProduct._id": id }, {
            $set: {
                "userProduct.$.quantity": quantity,
                "userProduct.$.description":description
            }

        }).exec()
        await User.updateOne({ email, "userProduct._id": id }, {
            $set: {
                "userProduct.$.price": sum,
                "userProduct.$.description":description
            }
        })
    }
    else {
        await User.updateOne({ email }, {
            $push: {
                userProduct: uProduct
            },
        }).exec()
        await User.updateOne({ email, "userProduct._id": id }, {
            $set: {
                "userProduct.$.price": price,
                "userProduct.$.description":description
            }
        }).exec()
    }
}
export const adminProductAddBasket = async (id: string, email: string, quantity: number) => {
    let sum = 0
    const aProduct: any = await adminProduct.findById(id)
    const isAdminProductBasket = await User.find({
        adminProduct: {
            $elemMatch: {
                title: aProduct.title
            }
        }
    }, { adminProduct: { $elemMatch: { title: aProduct.title } } })
    if ((await isAdminProductBasket).length > 0) {
        //@ts-ignore
        sum += aProduct.price * quantity
        await User.updateOne({ email, "adminProduct._id": id }, {
            $set: {
                "adminProduct.$.quantity": quantity
            }

        }).exec()
        await User.updateOne({ email, "adminProduct._id": id }, {
            $set: {
                "adminProduct.$.price": sum
            }
        })
    }
    else {
        await User.updateOne({ email }, {
            $push: {
                adminProduct: aProduct
            }
        }).exec()
    }
}

export const productAddBasket = async (id: string, email: string, quantity: number) => {
    let sum = 0
    const product: any = await Product.findById(id)
    const productBasket = await User.find({
        products: {
            $elemMatch: {
                title: product.title
            }
        }
    }, { products: { $elemMatch: { title: product.title } } })
    if ((await productBasket).length > 0) {
        //@ts-ignore
        sum += product.price * quantity
        await User.updateOne({ email, "products._id": id }, {
            $set: {
                "products.$.quantity": quantity
            }

        }).exec()
        await User.updateOne({ email, "products._id": id }, {
            $set: {
                "products.$.price": sum
            }
        })
    }
    else {
        await User.updateOne({ email }, {
            $push: {
                products: product
            }
        }).exec()
    }
}



export const deleteUserProductBasket = async (id: string, email: string) => {

    await User.updateOne({ email }, {
        $pull: {
            userProduct: { _id: id }
        }
    }).exec()
}
export const deleteAdminProductBasket = async (id: string, email: string) => {
    await User.updateOne({ email }, {
        $pull: {
            adminProduct: { _id: id }
        }
    }).exec()
}
export const deleteProductBasket = async (id: string, email: string) => {
    await User.updateOne({ email }, {
        $pull: {
            products: { _id: id }
        }
    }).exec()
}
const payParsingData = (payArr: any) => {
    let arr = []
    for (let value in payArr[0].name, payArr[0].description, payArr[0].price) {
        arr.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: payArr[0].name[value],
                    description: payArr[0].description[value],
                },
                unit_amount: payArr[0].price[value] * 100,
            },
            quantity: payArr[0].quantity[value]
        })

    }
    return arr
}
export const postPayment = async (email: any) => {
    let payArr: any = [{
        name: [],
        description: [],
        price: [],
        quantity: []
    }]
    const admin: any = await AdminUser.find({})
    //@ts-ignore
    const stripe = new Stripe(admin[0].stripeSecretKey)

    const userProductBasket = await User.find({ email })
    const productBasket = await User.find({ email })
    const adminProductBasket = await User.find({ email })
    //@ts-ignore
    if (adminProductBasket[0].adminProduct) {
        //@ts-ignore
        if (adminProductBasket[0].adminProduct.length > 0) {
            //@ts-ignore
            for (let i = 0; i < adminProductBasket[0].adminProduct.length; i++) {
                //@ts-ignore
                payArr[0].name.push(adminProductBasket[0].adminProduct[i].title)
                //@ts-ignore
                payArr[0].description.push(adminProductBasket[0].adminProduct[i].description)
                //@ts-ignore
                payArr[0].price.push(adminProductBasket[0].adminProduct[i].price)
                //@ts-ignore
                payArr[0].quantity.push(adminProductBasket[0].adminProduct[i].quantity)
                
            }
            //@ts-ignore
            await User.updateOne({ email }, {
                $addToSet: {
                    adminBuy:{$each:adminProductBasket[0].adminProduct}
                }
            },{upsert:true}).exec()
            //@ts-ignore
            await User.updateOne({ email }, {
                $pullAll: {
                    adminProduct:adminProductBasket[0].adminProduct
                }
            },{upsert:true}).exec()
        }
    }
    //@ts-ignore
    if (userProductBasket[0].userProduct) {
        //@ts-ignore
        if (userProductBasket[0].userProduct.length > 0) {
            for (let i = 0; i < userProductBasket[0].userProduct.length; i++) {
                //@ts-ignore
                payArr[0].name.push(userProductBasket[0].userProduct[i].title)
                //@ts-ignore
                payArr[0].description.push(userProductBasket[0].userProduct[i].description)
                //@ts-ignore
                payArr[0].price.push(userProductBasket[0].userProduct[i].price)
                //@ts-ignore
                payArr[0].quantity.push(userProductBasket[0].userProduct[i].quantity)
            }
            //@ts-ignore
            await User.updateOne({ email }, {
                $addToSet: {
                    userProductbuy:{$each:userProductBasket[0].userProduct}
                }
            },{upsert:true}).exec()
            //@ts-ignore
            await User.updateOne({ email }, {
                $pullAll: {
                    userProduct:userProductBasket[0].userProduct
                }
            },{upsert:true}).exec()
        }
    }
    //@ts-ignore
    if (productBasket[0].products) {
        //@ts-ignore
        if (productBasket[0].products.length > 0) {
            //@ts-ignore
            for (let i = 0; i < productBasket[0].products.length; i++) {
                //@ts-ignore
                payArr[0].name.push(productBasket[0].products[i].title)
                //@ts-ignore
                payArr[0].description.push(productBasket[0].products[i].description)
                //@ts-ignore
                payArr[0].price.push(productBasket[0].products[i].price)
                //@ts-ignore
                payArr[0].quantity.push(productBasket[0].products[i].quantity)

            }
             //@ts-ignore
             await User.updateOne({ email }, {
                $addToSet: {
                    buy: {$each:productBasket[0].products}
                }
            },{upsert:true}).exec()
            //@ts-ignore
            await User.updateOne({ email }, {
                $pullAll: {
                    products: productBasket[0].products
                },
            
            },{upsert:true}).exec()
        }
    }
    const line_items = payParsingData(payArr).map((item)=>{
        return {
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:item.price_data.product_data.name,
                        description:item.price_data.product_data.description,
                    },
                    unit_amount:item.price_data.unit_amount,
                },
                quantity:item.quantity
        }
    })
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode:"payment",
        success_url:"https://example.com/success",
        cancel_url:"https://example.com/cancel"
    })
   return session
}