import { Router } from 'express'
import {
	createTeam,
	addMemberToTeam,
	removeMemberfromTeam,
	addProjectLink,
	getTeam,
    getTeamsInHackathon
} from '../controller/team.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/createTeam', verifyJWT, createTeam)
router.patch('/addMember', verifyJWT, addMemberToTeam)
router.patch('/removeMember', verifyJWT, removeMemberfromTeam)
router.patch('/addProjectLink', verifyJWT, addProjectLink)
router.get('/getTeam/:teamId', verifyJWT, getTeam)
router.get('/getTeam/:hackathonID', verifyJWT, getTeamsInHackathon)

export default router;
