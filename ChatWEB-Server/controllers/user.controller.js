import UserModel from "../models/Users.js"
import { generateSignedUrl } from "../s3.js"

const users= async(req,res)=>{
    try{
        const loginUser=req.user._id
        const allUsers=await UserModel.find({_id: {$ne:loginUser}}).select('-password')
        
        const usersWithUrl = [];
        for(var i = 0; i < allUsers.length; i++){
            const obj = allUsers[i];
            let imageUrl = null;

            if(obj.image != null){
                try{
                    const filename = obj.image;
                    const url = await generateSignedUrl({ filename });
                    imageUrl = url.preSignedUrl;
                }
                catch(error){
                    console.log(error)
                    console.log(`Error fetching url for user ${obj._id}`)
                }
            }
            usersWithUrl.push({
                "_id" : obj._id,
                "username" : obj.username,
                "image" : imageUrl
            }) 
        }
        
        return res.status(200).json({msg:"success", users: usersWithUrl})
    }catch(err){
        console.log("Error", err.message)
        res.status(500).json({msg:err})
    }

}

export default users