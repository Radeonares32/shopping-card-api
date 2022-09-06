import { Document,Types } from 'mongoose'

export interface IProduct extends Document {
    title: string,
    description: string,
    image: string,
    price: number,
    quantity:number
}
export interface IAdminProduct extends Document,ICategory {
 title:string,
 description:string,
 image:string,
 price:number,
 quantity:number,
 category:[ICategory]
}
export interface ICategory extends Document{
    title:string,
    gram:number,
    price:number
}