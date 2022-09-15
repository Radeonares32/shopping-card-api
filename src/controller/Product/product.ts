import { Handler } from "express"
// JWT
import { JwtSign, JwtVerify } from '../../middleware/jwt'

// Services
import { ProductService, UserServices } from '../../service/service'
import { Product } from "../../models/Product/Product";


export const postProduct: Handler = async (req, res) => {
    const { title, description, price, quantity } = req.body
    const image = req.file?.originalname
    const tk = req.headers.authorization
    if (tk) {
        const token: any = tk?.split(' ')[1]
        const tokenVerify: any = JwtVerify(token)
        const admin = await UserServices.findAdminToken(tokenVerify)
        if (admin) {
            const message = await ProductService.addProduct(title, description, image, price, quantity)
            res.status(200).json({
                message: message.message
            })
        } else {
            res.status(403).json({
                message: "Token not verify"
            })
        }
    } else {
        res.status(403).json({
            message: "Not Token"
        })
    }
}
export const updateProduct: Handler = async (req, res) => {
    const { id, title, description, price, quantity } = req.body
    const image = req.file?.originalname
    const tk = req.headers.authorization
    if (tk) {
        const token: any = tk?.split(' ')[1]
        const tokenVerify: any = JwtVerify(token)
        const admin = await UserServices.findAdminToken(tokenVerify)
        if (admin) {
            await ProductService.updateProduct(id, title, description, image, price, quantity)
            res.status(200).json({
                message: "Product updated"
            })
        } else {
            res.status(403).json({
                message: "Token not verify"
            })
        }
    } else {
        res.status(403).json({
            message: "Not Token"
        })
    }
}
export const getProductDetail: Handler = async (req, res) => {
    const { id } = req.params
    const product = await ProductService.findByIdProduct(id)
    res.json({
        product
    })
}
export const getAllProduct: Handler = async (req, res) => {
    const products = await ProductService.allProduct()
    res.json({
        products
    })
}
export const deleteProduct: Handler = async (req, res) => {
    const { id } = req.params
    const tk = req.headers.authorization
    if (tk) {
        const token: any = tk?.split(' ')[1]
        const tokenVerify: any = JwtVerify(token)
        const admin = await UserServices.findAdminToken(tokenVerify)
        if (admin) {
            await ProductService.deleteProduct(id)
            res.json({
                message: "Deleted product"
            })
        } else {
            res.status(403).json({
                message: "Token not verify"
            })
        }
    } else {
        res.status(403).json({
            message: "Not Token"
        })
    }
}

export const postAdminProduct: Handler = async (req, res) => {
    const { title, description, price, quantity } = req.body
    const category = JSON.parse(req.body.category)
    const image = req.file?.originalname
    const tk = req.headers.authorization
    if (tk) {
        const token: any = tk?.split(' ')[1]
        const tokenVerify: any = JwtVerify(token)
        const admin = await UserServices.findAdminToken(tokenVerify)
        if (admin) {
            const adminProductMessage = await ProductService.adminProductAdd(title, description, image, price, quantity, category)
            res.status(200).json({
                message: adminProductMessage.message
            })
        } else {
            res.status(403).json({
                message: "Token not verify"
            })
        }
    } else {
        res.status(403).json({
            message: "Not Token"
        })
    }
}
export const getAllAdminProduct: Handler = async (req, res) => {

    const adminProduct = await ProductService.allAdminProduct()
    res.status(200).json({
        adminProduct
    })
}
export const getAdminProductDetail: Handler = async (req, res) => {
    const { id } = req.params

    const adminProduct = await ProductService.findByIdAdminProduct(id)
    res.status(200).json({
        adminProduct
    })
}
export const deleteAdminProduct: Handler = async (req, res) => {
    const { id } = req.params
    const tk = req.headers.authorization
    if (tk) {
        const token: any = tk?.split(' ')[1]
        const tokenVerify: any = JwtVerify(token)
        const admin = await UserServices.findAdminToken(tokenVerify)
        if (admin) {
            await ProductService.deleteAdminProduct(id)
            res.json({
                message: "Deleted product"
            })
        } else {
            res.status(403).json({
                message: "Token not verify"
            })
        }
    } else {
        res.status(403).json({
            message: "Not Token"
        })
    }
}
export const addUserCategories: Handler = async (req, res) => {
    const { title, gram, price } = req.body
    const tk = req.headers.authorization
    if (tk) {
        const token: any = tk?.split(' ')[1]
        const tokenVerify: any = JwtVerify(token)
        const admin = await UserServices.findAdminToken(tokenVerify)
        if (admin) {
            const categoryMessage = await ProductService.addUserCategory(title, gram, price)
            res.json({
                message: categoryMessage.message
            })
        } else {
            res.status(403).json({
                message: "Token not verify"
            })
        }
    } else {
        res.status(403).json({
            message: "Not Token"
        })
    }
}
export const allUserCategories: Handler = async (req, res) => {
    const tk = req.headers.authorization
    if (tk) {
        const token: any = tk?.split(' ')[1]
        const tokenVerify: any = JwtVerify(token)
        const admin = await UserServices.findAdminToken(tokenVerify)
        if (admin) {
            const categories = await ProductService.allUserCategory()
            res.json({
                categories
            })
        } else {
            res.status(403).json({
                message: "Token not verify"
            })
        }
    } else {
        res.status(403).json({
            message: "Not Token"
        })
    }
}
export const deleteUserCategories: Handler = async (req, res) => {
    const { id } = req.params
    const tk = req.headers.authorization
    if (tk) {
        const token: any = tk?.split(' ')[1]
        const tokenVerify: any = JwtVerify(token)
        const admin = await UserServices.findAdminToken(tokenVerify)
        if (admin) {
            await ProductService.deleteUserCategory(id)
            res.json({
                message: "Deleted User Category"
            })
        } else {
            res.status(403).json({
                message: "Token not verify"
            })
        }
    } else {
        res.status(403).json({
            message: "Not Token"
        })
    }
}
export const allUserProduct: Handler = async (req, res) => {
    const userProduct = await ProductService.allUserProduct()
    res.json({
        userProduct
    })
}
export const userProductAddBasket: Handler = async (req, res) => {
    const { id, email, quantity, price,description } = req.body
    const tk = req.headers.authorization
    if (tk) {
        const token: any = tk?.split(' ')[1]
        const tokenVerify: any = JwtVerify(token)
        const user = await UserServices.findUserToken(tokenVerify)
        if (user) {
            await ProductService.userProductAddBasket(id, email, quantity, price,description)
            res.json({
                message: "Add basket product"
            })
        } else {
            res.status(403).json({
                message: "Token not verify"
            })
        }
    } else {
        res.status(403).json({
            message: "Not Token"
        })
    }
}
export const deleteUserProductBasket: Handler = async (req, res) => {
    const { id, email } = req.params
    const tk = req.headers.authorization
    if (tk) {
        const token: any = tk?.split(' ')[1]
        const tokenVerify: any = JwtVerify(token)
        const user = await UserServices.findUserToken(tokenVerify)
        if (user) {
            await ProductService.deleteUserProductBasket(id, email)
            res.json({
                message: "Remove user product"
            })
        } else {
            res.status(403).json({
                message: "Token not verify"
            })
        }
    } else {
        res.status(403).json({
            message: "Not Token"
        })
    }
}
export const adminProductAddBasket: Handler = async (req, res) => {
    const { id, email, quantity } = req.body
    const tk = req.headers.authorization
    if (tk) {
        const token: any = tk?.split(' ')[1]
        const tokenVerify: any = JwtVerify(token)
        const user = await UserServices.findUserToken(tokenVerify)
        if (user) {
            await ProductService.adminProductAddBasket(id, email, quantity)
            res.json({
                message: "Add basket admin product"
            })
        } else {
            res.status(403).json({
                message: "Token not verify"
            })
        }
    } else {
        res.status(403).json({
            message: "Not Token"
        })
    }
}

export const productAddBasket: Handler = async (req, res) => {
    const { id, email, quantity } = req.body
    const tk = req.headers.authorization
    if (tk) {
        const token: any = tk?.split(' ')[1]
        const tokenVerify: any = JwtVerify(token)
        const user = await UserServices.findUserToken(tokenVerify)
        if (user) {
            await ProductService.productAddBasket(id, email, quantity)
            res.json({
                message: "Add basket  product"
            })
        } else {
            res.status(403).json({
                message: "Token not verify"
            })
        }
    } else {
        res.status(403).json({
            message: "Not Token"
        })
    }
}

export const deleteAdminProductBasket: Handler = async (req, res) => {
    const { id, email } = req.params
    const tk = req.headers.authorization
    if (tk) {
        const token: any = tk?.split(' ')[1]
        const tokenVerify: any = JwtVerify(token)
        const user = await UserServices.findUserToken(tokenVerify)
        if (user) {
            await ProductService.deleteAdminProductBasket(id, email)
            res.json({
                message: "Remove admin product"
            })
        } else {
            res.status(403).json({
                message: "Token not verify"
            })
        }
    } else {
        res.status(403).json({
            message: "Not Token"
        })
    }
}
export const deleteProductBasket: Handler = async (req, res) => {
    const { id, email } = req.params
    const tk = req.headers.authorization
    if (tk) {
        const token: any = tk?.split(' ')[1]
        const tokenVerify: any = JwtVerify(token)
        const user = await UserServices.findUserToken(tokenVerify)
        if (user) {
            await ProductService.deleteProductBasket(id, email)
            res.json({
                message: "Remove admin product"
            })
        } else {
            res.status(403).json({
                message: "Token not verify"
            })
        }
    } else {
        res.status(403).json({
            message: "Not Token"
        })
    }
}
export const postPayment: Handler = async (req, res) => {
    const { email } = req.body
    const tk = req.headers.authorization

    if (tk) {
        const token: any = tk?.split(' ')[1]
        const tokenVerify: any = JwtVerify(token)
        const user = await UserServices.findUserToken(tokenVerify)
        if (user) {
            const payment = await ProductService.postPayment(email)
            res.json({
                message: "Success Payment",
                payment
            })
        } else {
            res.status(403).json({
                message: "Token not verify"
            })
        }
    } else {
        res.status(403).json({
            message: "Not Token"
        })
    }
}