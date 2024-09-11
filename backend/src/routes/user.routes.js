import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controller/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

<<<<<<< HEAD
// secured Routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").pose(refreshAccessToken)
=======
// This is just a comment
>>>>>>> 08a62f1f74ef7cb1122e91c58401eb313799e317

export default router;