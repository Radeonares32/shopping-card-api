import mongoose from "mongoose";
import { Config } from '../config/config'
import chalk from 'chalk'

Config.DotenvConfig()
export const MongoConnection = async () => {
    try {
       
        //mongoose.connect(`mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`)
        await mongoose.connect(`mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/?authSource=${process.env.MONGO_DB_NAME}`)
        console.log(chalk.green('Mongodb connected !'))
    
    }
    catch (err) {
        console.log(chalk.red(`Error: ${err}`))
    }
}