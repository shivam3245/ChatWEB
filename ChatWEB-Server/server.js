import express from "express"
import cors from 'cors'
import Connect from "./db/connection.js"
import dotenv from 'dotenv';
dotenv.config();
import AuthRouter from './routes/auth.js'


const app= express()
app.use(cors())
app.use(express.json())
app.use('/chat/user', AuthRouter)

app.listen(process.env.PORT , ()=>{
    Connect()
    console.log("Running")
})