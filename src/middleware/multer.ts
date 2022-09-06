import multer from 'multer'
import { Config } from '../config/config'
Config.DotenvConfig()
export const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, (process.cwd()+process.env.UPLOADS_DIR))
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});

export const upload = multer({ storage: multerStorage })

