import express from 'express'
import verifyUser from '../middleware/verifyUser.js'
import users from '../controllers/user.controller.js'


const router=express.Router()
router.get('/', verifyUser ,users)

export default router