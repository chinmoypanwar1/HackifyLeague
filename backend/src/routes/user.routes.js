import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controller/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// secured Routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").pose(refreshAccessToken)

export default router;