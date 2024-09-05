import { Router } from "express";
import { loginUser, registerUser } from "../controller/user.controller";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser);

// This is just a comment
//hey!!!!
export default router;