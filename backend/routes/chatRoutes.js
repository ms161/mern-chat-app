const express=require('express')
const chatController=require('../controllers/chatController')
const authController=require('../controllers/authController')
const router=express.Router()

router.route('/create-chat').post(authController.protect,chatController.saveChat)

router.route('/get-one-to-one-chat').post(authController.protect,chatController.getChats)

router.route('/get-group-chat').post(authController.protect,chatController.convertToGroupChat,chatController.getChats)

module.exports=router