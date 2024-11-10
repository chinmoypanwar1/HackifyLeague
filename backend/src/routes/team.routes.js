import { Router } from "express";
import { createTeam, addMemberToTeam, removeMemberfromTeam } from "../controller/team.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/createTeam", verifyJWT, createTeam);
router.patch("/addMember", verifyJWT, addMemberToTeam);
router.patch("/removeMember", verifyJWT, removeMemberfromTeam);

export default router