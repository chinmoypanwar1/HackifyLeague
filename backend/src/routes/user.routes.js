import { Router } from "express";
import { forgotPasswordMail, loginUser, registerUser, resetPassword } from "../controller/user.controller";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgotPassword").post(forgotPasswordMail)
router.route("/resetPassword/:resetToken").patch(resetPassword)

export default router;