import { Router } from "express";
import { changeFullName, changeCurrentPassword, forgotPasswordMail, getUser, loginUser, logoutUser, refreshAccessToken, registerUser, resetPassword } from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// secured Routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
// router.route("/forgotPassword").post(forgotPasswordMail)
// router.route("/resetPassword/:resetToken").patch(resetPassword)
router.route("/getUser").get(verifyJWT, getUser)
router.route("/changeCurrentPassword").patch(verifyJWT, changeCurrentPassword)
router.route("/changeFullName").patch(verifyJWT, changeFullName)

export default router;