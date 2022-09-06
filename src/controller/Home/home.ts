import { Handler } from "express"
export const getHome: Handler = (req, res) => {
    res.status(200).json({ message: 'Success' })
}
