import UserModel from "../models/Users.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const verifyUser = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || req.headers.authorization.startsWith('Bearer null')) {
            return res.status(401).json({ msg: "Unauthorized, no token provided" });
        }

        const token = req.headers.authorization.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ msg: "Invalid token" });
        }

        const user = await UserModel.findOne({ _id: decoded.id }).select('-password');
        req.user = user;
        next();
    }

     catch (err) {
        if(err instanceof jwt.TokenExpiredError){
            console.log(err.message);
            return res.status(401).json({ msg : "Token Expired" });
        }
        else{
            console.log(err);
            return res.status(500).json({ msg: "Server error" });
        }
    }
};

export default verifyUser;
