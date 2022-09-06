import { Handler } from 'express'
import jwt, { JsonWebTokenError, VerifyErrors } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// secret keys

import { jwtPayload } from '../secrets_key/jwt_payload'



export const JwtSign = (email: string) => {
    try {
        const token = jwt.sign(email, jwtPayload)
        return token
    }
    catch (err) {
        return err
    }

}
export const JwtVerify = (tokenVerify: string) => {
    try {
        const token = jwt.verify(tokenVerify, jwtPayload)
        return token
    }
    catch (err) {
        return err
    }

}