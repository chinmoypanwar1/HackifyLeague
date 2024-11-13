import { Router } from "express";
import { changeAccountDetails, changePassword, forgotPasswordMail, getUser, loginUser, logoutUser, refreshAccessToken, registerUser, resetPassword, uploadAvatarImage, updateAvatarImage, searchUsers } from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/forgotPassword").post(forgotPasswordMail)
router.route("/resetPassword/:resetToken").post(resetPassword)
router.route("/searchUser").get(verifyJWT, searchUsers)

// secured Routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/getUser").get(verifyJWT, getUser)
router.route("/changePassword").patch(verifyJWT, changePassword)
router.route("/changeAccountDetails").patch(verifyJWT, changeAccountDetails)
router.route("/uploadAvatarImage").patch(verifyJWT, upload.single("avatarImage"), uploadAvatarImage)
router.route("/updateAvatarImage").patch(verifyJWT, upload.single("avatarImage"), updateAvatarImage)

export default router;