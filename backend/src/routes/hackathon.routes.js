import { Router } from "express"
import { createHackathon, getHackathonById, getHackathons, updateHackathonDetails, searchHackathon } from "../controller/hackathon.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/createHackathon", createHackathon);
router.get("/getHackathons", getHackathons)
router.get("/getHackathon/:hackathonId", getHackathonById)
router.patch("/updateHackathon/:hackathonId",verifyJWT, updateHackathonDetails)
route.get("/searchHackathon", verifyJWT, searchHackathon)

export default router;
