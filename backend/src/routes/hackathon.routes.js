import { Router } from "express"
import { createHackathon, getHackathonById, getHackathons, updateHackathonDetails } from "../controller/hackathon.controller.js"

const router = Router()

router.post("/createHackathon", createHackathon);
router.get("/getHackathons", getHackathons)
router.get("/getHackathon/:id", getHackathonById)
router.patch("/updateHackathon/:id", updateHackathonDetails)

export default router;