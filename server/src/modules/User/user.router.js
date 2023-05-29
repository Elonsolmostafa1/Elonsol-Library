import {Router} from 'express'
import userAuth from '../../middleware/auth.js';
import validation from '../../middleware/validation.js';
import verifyResetPasswordToken from '../../middleware/verifyResetPasswordToken..js';
import * as userController from './user.controller.js';
import * as userValidation from './user.validation.js';

const router = Router();



router.post('/signup',validation(userValidation.signUpSchema),userController.signUp)
router.post("/signin" , validation(userValidation.signInSchema), userController.signIn)
router.get('/',userAuth, userController.getUserData)
router.put('/',validation(userValidation.updateUserSchema),userAuth, userController.updateUser)
router.delete('/',userAuth, userController.deleteUser)
router.patch('/',userAuth, userController.softDeleteUser)
router.get('/verify/:token' , userController.verifyUser)
router.post('/forget_password',validation(userValidation.emailSchema),userController.forgetPassword)
router.patch('/reset_password',verifyResetPasswordToken,validation(userValidation.passwordSchema),userController.resetPassword)
router.put('/changePassword',userAuth,validation(userValidation.changePasswordSchema),userController.changePassword)
router.patch('/logout',userAuth,userController.logout)



export default router;