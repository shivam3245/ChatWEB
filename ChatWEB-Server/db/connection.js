import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const Connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected")
    }catch(err){
        console.log(err)
    }
}

export default Connect