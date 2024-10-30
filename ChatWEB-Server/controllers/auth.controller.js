import multer, {memoryStorage} from 'multer'
import UserModel from '../models/Users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { uploadTOS3 } from '../s3.js';
dotenv.config();

// const storage=multer.diskStorage({
//     destination:(req,res,cb)=>{
//         cb(null, 'public/images')
//     },
//     filename:(req,file,cb)=>{
//         cb(
//             null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//         )
//     }
// })

// export const upload =multer({
//     storage:storage
// })

const storage = memoryStorage();
export const upload = multer({ storage });

async function register(req,res){
    try{
        const {username,password}=req.body
        const file= req.file != null ? req.file : null;

        const userExist=await UserModel.findOne({username})
        if(userExist) {
            return res.status(400).json({msg: "User already existed"})
        }

        const hashpassword=await bcrypt.hash(password,10);
        let imageKey = null;
        if(file){
            const { error, key } = await uploadTOS3({file, username});
            if(error) return res.status(500).json({message : "Image upload Failed"});
            imageKey = key;
        }

        const newUser=new UserModel({
            username : username,
            password:hashpassword,
            image: imageKey
        })

        await newUser.save() //saving the user
        return res.status(200).json({msg:"success"})

    }  catch(error)
        {
        console.log(error)
        return res.status(500).json({msg:"error"+ error})
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

      
        const userExist = await UserModel.findOne({ username });
        if (!userExist) {
            return res.status(400).json({ msg: "User does not exist" }); 
        }

       
        const matchPassword = await bcrypt.compare(password, userExist.password);
        if (!matchPassword) {
            return res.status(400).json({ msg: "Incorrect password" }); 
        }

      
        const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return res.status(200).json({ msg: "success", token, user: { _id: userExist._id, username: userExist.username } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred. Please try again." }); 
    }
}

const verify=(req,res)=>{
    return res.status(200).json({msg:"success"})
}

export {register, login, verify }