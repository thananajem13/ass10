import Router from 'express'
import { auth } from '../../middleware/auth.js'
import { validation } from '../../middleware/validation.js'
import { HME, myMulter, pathName, validationTypes } from '../../services/cloudinaryMulter.js';
import * as userController from "./controller/user.js";
import * as userValidators from './user.validation.js'
const router = Router()
router.put('/updateProfile', auth(['admin', 'user']), validation(userValidators.updateProfile), userController.updateProfile)
router.delete('/softDelete/:id', auth(['admin', 'user']), validation(userValidators.softDelete), userController.softDelete)
router.get('/profile/pic',
    myMulter(validationTypes.image, pathName.userProfile).single('image'),
    HME, auth(['user', 'admin']), userController.addProfilePic)
router.get('/cover/pics',
    myMulter(validationTypes.image, pathName.userProfileCover).array('image', 7),
    HME, auth(['user', 'admin']), userController.addCoverPics)
router.get('/posts/user/:_id/page/:page?/size/:size?', auth(['admin', 'user']), validation(userValidators.userPosts), userController.getFixedPostOfUser)
router.get('/usersPosts/page/:page?/size/:size?', auth(['admin', 'user']), userController.getUsersAndPostsAndComments)

router.patch('/block/:id', auth(['admin']), validation(userValidators.blockUser), userController.blockUser)

export default router