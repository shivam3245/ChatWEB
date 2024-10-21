import multer from 'multer'
import UserModel from '../models/Users'
import path from 'path'

const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null, 'public/images')
    },
    filename:(req,res,cb)=>{
        cb(
            null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        )
    }
})

const upload =multer({
    storage:storage
})


function Register(req,res){
    

}

export default Register