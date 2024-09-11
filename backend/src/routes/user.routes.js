import { Router } from "express";
import { forgotPasswordMail, loginUser, logoutUser, refreshAccessToken, registerUser, resetPassword } from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// secured Routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/forgotPassword").post(forgotPasswordMail)
router.route("/resetPassword/:resetPassword").post(resetPassword)

export default router;