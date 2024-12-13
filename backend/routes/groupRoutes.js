const express=require('express')
const groupController=require('../controllers/groupController')
const authController=require('../controllers/authController')

const router=express.Router()


router.route('/create-group').post(authController.protect,groupController.createGroup)

router.route('/get-all-groups').get(authController.protect,groupController.getAllGroups)

router.route('/get-my-groups').get(authController.protect,groupController.getMyGroups)

router.route('/add-member').patch(authController.protect,groupController.addMemberToGroup)


module.exports=router
