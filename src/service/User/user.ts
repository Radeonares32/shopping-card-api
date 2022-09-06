import {User} from '../../models/User/User'
import {AdminUser} from '../../models/User/AdminUser'

export const createUser = async (firstName: string, lastName: string, email: string, password: string) => {
  const isUser = findUserEmail(email, password)
  if ((await isUser).length > 0) {
    return {
      message: "User already"
    }
  }
  else {
    const user = await User.create({ firstName, lastName, email, password })
    await user.save()
    return {
      message: "User created"
    }
  }
}

export const findUserEmail = async (email: string, password: string) => {
  return User.find({email, password});
}
export const findUserToken = async (email: any) => {
  return User.find({email});
}
export const createAdminUser = async () => {
  const isAdmin = AdminUser.find()
  if ((await isAdmin).length > 0) {
    return {
      message: "Admin already"
    }
  }
  else {
    const admin = await AdminUser.create({ email:"admin@gmail.com", password:"123" ,stripeSecretKey:"sk_test_51LUzwkFu78BChfeo4Gg7hVDtggnZtaIPQn8n5JeisvHyV4j5TlJGUvOz5SMNHrqL8ZGRY8yxwM0wjXZdj1tGiVfT00yW0Roq2X"})
    await admin.save()
    return {
      message: "Admin created"
    }
  }
}
export const findAdminUsers = async (email: string,password:string) => {
  return AdminUser.find({email,password});
}
export const findAdminUserToken = async (email:any,password:string) => {
  return AdminUser.find({email,password});
}
export const updateUser = async  (email:string,lastName:string,firstName:string,newPassword:string,address:string,cardName:string,cvv:number,cardNumber:string) => {
    await User.updateOne({email},{email,lastName,firstName,password:newPassword,address,cardName,cvv,cardNumber})
}
export const updateAdminUser = async (email:string,password:string,stripeSecretKey:string) => {
  await AdminUser.updateOne({email},{email,password,stripeSecretKey})
}
export const findAdminToken = async (email:any) => {
  return AdminUser.find({email});
}
