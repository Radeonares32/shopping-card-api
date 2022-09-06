import { Handler } from "express"

// JWT
import { JwtSign, JwtVerify } from '../../middleware/jwt'

// Services
import { UserServices } from '../../service/service'

export const postUser: Handler = async (req, res) => {
    const { firstName, lastName, email, password, passwordRepeat } = req.body
    if (password !== passwordRepeat) {
        res.status(200).json({
            message: "Password no match",
        })
    } else {
        const user = await UserServices.createUser(firstName, lastName, email, password)
        res.json({
            message: user.message
        })
    }

}
export const getToken: Handler = async (req, res) => {
    const { email, password } = req.params
    const user = await UserServices.findUserEmail(email, password)
    if (user.length > 0) {
        const token = JwtSign(email)
        res.status(200).json({
            message: "Success Token",
            data: token
        })
    } else {
        res.status(404).json({
            message: "No User"
        })
    }
}
export const getTokenUser: Handler = async (req, res) => {
    const tk = req.headers.authorization
    const token:any =tk?.split(' ')[1]
    const tokenVerify = JwtVerify(token)
    const user = await UserServices.findUserToken(tokenVerify)
    res.json({
        message: "Success Token Verify",
        data: user
    })
}
export const updateUser:Handler = async (req,res) => {
    try {
        const {firstName,lastName,newPassword,address,cvv,cardName,cardNumber} = req.body
        const tk = req.headers.authorization
        const token:any =tk?.split(' ')[1]
        const tokenVerify:any = JwtVerify(token)
        const email = await UserServices.findUserToken(tokenVerify)
        if(email){
            await UserServices.updateUser(email[0].email,lastName,firstName,newPassword,address,cardName,cvv,cardNumber)
            res.status(200).json({
                message:"Updated user"
            })
        }
        else {
            res.status(200).json({
                message:"Token Not Validate"
            })
        }
    }
    catch (err) {
        res.status(200).json({
            message:`Token Not Validate:  ${err}`,
        })
    }
}

// Admin Controller

export const getAdminToken:Handler = async (req,res) => {
    try {
        const {email,password} = req.body
        const admin = await UserServices.findAdminUserToken(email,password)
        if(admin) {
            const token = JwtSign(admin[0].email)
            res.status(200).json({
                message:"Success Token",
                data:token
            })
        }
        else {
            res.status(200).json({
                message:"No User"
            })
        }
    }
    catch (err) {
        res.status(200).json({
            message:`Token Not Validate:  ${err}`,
        })
    }
}
export const updateAdminUser:Handler =  async (req,res) => {
    try {
        const { email,password,stripeSecretKey } = req.body
        const tk = req.headers.authorization
        const token:any =tk?.split(' ')[1]
        const tokenVerify:any = JwtVerify(token)
        const admin = await UserServices.findAdminUserToken(tokenVerify,password)
        if(admin) {
            await UserServices.updateAdminUser(email,password,stripeSecretKey)
            res.status(200).json({
                message:"Updated Admin"
            })
        }else {
            res.status(200).json({
                message:"No User"
            })
        }
    }
    catch (err){
        res.status(200).json({
            message:`Token Not Validate:  ${err}`,
        })
    }
}
