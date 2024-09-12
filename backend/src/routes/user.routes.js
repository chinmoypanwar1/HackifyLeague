import { Router } from "express";
import { changeAccountDetails, changePassword, forgotPasswordMail, getUser, loginUser, logoutUser, refreshAccessToken, registerUser, resetPassword } from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/forgotPassword").post(forgotPasswordMail)
router.route("/resetPassword/:resetToken").post(resetPassword)

// secured Routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/getUser").get(verifyJWT, getUser)
router.route("/changePassword").patch(verifyJWT, changePassword)
router.route("/changeAccountDetails").patch(verifyJWT, changeAccountDetails)

export default router;