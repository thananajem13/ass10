import  Router  from "express";
import * as authController from "./controller/auth.js";
import  {validation}  from '../../middleware/validation.js';
import * as authValidators from './auth.validation.js' 
const router = Router()

router.post('/signUp',validation(authValidators.signUp),authController.signUp)
router.post('/signIn',validation(authValidators.signIn),authController.signIn)


router.get('/confirmEmail/:token',validation(authValidators.confirmEmail),authController.confirmEmail)

export default router