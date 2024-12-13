const express=require('express')
const chatController=require('../controllers/chatController')
const authController=require('../controllers/authController')
const router=express.Router()

router.route('/create-chat/:recieverId').post(authController.protect,chatController.saveChat)

router.route('/get-one-to-one-chat/:sentToId').get(authController.protect,chatController.getOneToOneChat)

module.exports=router