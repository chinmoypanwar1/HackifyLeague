import { Team } from '../models/team.models.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/apiError.js'
import { Hackathon } from '../models/hackathon.models.js'
import { User } from '../models/user.models.js'

const memberExistsInTeam = async (userId, hackathonId) => {
	const team = await Team.findOne({
		hackathon: hackathonId,
		'members.user': userId,
	})
	console.log('Member exist in team function : ', team)
	return team === null ? false : true
}

const createTeam = asyncHandler(async (req, res) => {
	const user = req.user
	const { hackathonId, displayName, description } = req.body
	if ([hackathonId, displayName].some((field) => field?.trim() === '')) {
		throw new ApiError(400, 'All fields are required')
	}

	const hackathon = await Hackathon.findById(hackathonId)

	if (!hackathon) {
		throw new ApiError(404, 'Hackathon not found')
	}

	if (hackathon.startDate < new Date()) {
		throw new ApiError(400, 'Hackathon has already started.')
	}
	if (hackathon.RegistrationDeadline > new Date()) {
		throw new ApiError(400, "Hackathon's registration has not started.")
	}
	if (hackathon.endDate < new Date()) {
		throw new ApiError(400, 'Hackathon has ended')
	}
	const memberinTeam = await memberExistsInTeam(user._id, hackathonId)
	console.log(memberinTeam)
	if (memberinTeam) {
		throw new ApiError(400, 'You already exists in a team.')
	}

	const teamCount = await Team.countDocuments({ hackathon: hackathonId })
	if (teamCount >= hackathon.limit) {
		throw new ApiError(400, 'The hackathon has been enrolled fully.')
	}

	const existingTeam = await Team.findOne({ displayname: displayName })
	if (existingTeam) {
		throw new ApiError(400, 'The team with a similar name already exists.')
	}

	const userId = user._id
	console.log(user._id)
	const team = await Team.create({
		hackathon: hackathonId,
		members: [
			{
				user: userId,
				role: 'admin',
			},
		],
		displayname: displayName,
		description,
		teamMemberLimit: hackathon.teamMemberLimit,
	})
	console.log('create team error')

	const populatedTeam = await team.populate({
		path: 'members.user',
		select: 'username fullname email avatarImage',
	})

	return res
		.status(201)
		.json(new ApiResponse(201, 'Team created successfully', populatedTeam))
})

const addMemberToTeam = asyncHandler(async (req, res) => {
	const { hackathonId, userId, teamId } = req.body
	const user = req.user

	if ([hackathonId, userId, teamId].some((field) => field?.trim() === '')) {
		throw new ApiError(400, 'All fields are required')
	}

	const hackathon = await Hackathon.findById(hackathonId)

	if (!hackathon) {
		throw new ApiError(404, 'Hackathon not found')
	}
	if (hackathon.RegistrationDeadline > new Date()) {
		throw new ApiError(400, "Hackathon's registration has not started.")
	}
	if (hackathon.startDate < new Date()) {
		throw new ApiError(400, 'Hackathon has already started.')
	}
	if (hackathon.endDate < new Date()) {
		throw new ApiError(400, 'Hackathon has ended')
	}

	const member = await User.findById(userId)
	if (!member) {
		throw new ApiError(404, 'The member you are trying to add is not found')
	}

	const memberInTeam = await memberExistsInTeam(userId, hackathonId)
	if (memberInTeam) {
		throw new ApiError(
			400,
			'The user you are trying to add already exists in a team.'
		)
	}

	const team = await Team.findById(teamId)
	if (!team) {
		throw new ApiError(404, 'Team not found')
	}

	if (team.members.find((member) => member.user.toString() === userId)) {
		throw new ApiError(
			400,
			'The user you are trying to add already exists in a team.'
		)
	}

	console.log(
		team.members.find(
			(member) => member.user.toString() === user._id.toString()
		)
	)

	if (
		!team.members.find(
			(member) =>
				member.user.toString() === user._id.toString() &&
				member.role === 'admin'
		)
	) {
		throw new ApiError(
			400,
			'You are not an admin. Please request the admin to add the user.'
		)
	}

	if (team.members.length >= team.teamMemberLimit) {
		throw new ApiError(400, 'The team is already full.')
	}

	try {
		team.members.push({
			user: userId,
			role: 'member',
		})

		await team.save({ validateBeforeSave: false })

		const populatedTeam = await team.populate({
			path: 'members.user',
			select: 'username fullname email avatarImage',
		})

		return res
			.status(200)
			.json(
				new ApiResponse(
					200,
					'Member has been added successfully',
					populatedTeam
				)
			)
	} catch (error) {
		console.error(error)
		throw new ApiError(500, 'Internal Server Error')
	}
})

const removeMemberfromTeam = asyncHandler(async (req, res) => {
	const { hackathonId, userId, teamId } = req.body
	const user = req.user

	if ([hackathonId, userId, teamId].some((field) => field?.trim() === '')) {
		throw new ApiError(400, 'All fields are required')
	}

	const hackathon = await Hackathon.findById(hackathonId)

	if (!hackathon) {
		throw new ApiError(404, 'Hackathon not found')
	}
	if (hackathon.RegistrationDeadline > new Date()) {
		throw new ApiError(400, "Hackathon's registration has not started.")
	}
	if (hackathon.startDate < new Date()) {
		throw new ApiError(400, 'Hackathon has already started.')
	}
	if (hackathon.endDate < new Date()) {
		throw new ApiError(400, 'Hackathon has ended')
	}

	const member = await User.findById(userId)
	if (!member) {
		throw new ApiError(404, 'The member you are trying to add is not found')
	}

	const team = await Team.findById(teamId)

	if (!team) {
		throw new ApiError(404, 'Team not found')
	}

	if (!team.members.find((member) => member.user.toString() === userId)) {
		throw new ApiError(
			400,
			'The user you are trying to remove  does not exists in your team.'
		)
	}

	if (
		!team.members.find(
			(member) =>
				member.user.toString() === user._id.toString() &&
				member.role === 'admin'
		)
	) {
		throw new ApiError(
			400,
			'You are not an admin. Please request the admin to add the user.'
		)
	}

	try {
		team.members = team.members.filter(
			(member) => member.user.toString() !== userId
		)

		await team.save({ validateBeforeSave: false })

		const populatedTeam = await team.populate({
			path: 'members.user',
			select: 'username fullname email avatarImage',
		})

		return res
			.status(200)
			.json(
				new ApiResponse(
					200,
					'Member has been removed successfully',
					populatedTeam
				)
			)
	} catch (error) {
		console.error(error)
		throw new ApiError(500, 'Internal Server Error')
	}
})

const getTeam = asyncHandler(async (req, res) => {
	const teamId = req.params

	const team = await Team.findById(teamId)

	if (!team) {
		throw new ApiError(404, 'Team not found. Please provide a valid ID')
	}

	return res
		.status(200)
		.json(new ApiResponse(200, 'Team Data Fetched Successfully', team))
})

const addProjectLink = asyncHandler(async (req, res) => {
	const { link, teamId } = req.body

	if (!link || !link.trim() || !teamId || !teamId.trim()) {
		throw new ApiError(400, 'Both project link and team ID are required.')
	}

	const team = await Team.findByIdAndUpdate(
		teamId,
		{ project: link },
		{ new: true }
	)

	if (!team) {
		throw new ApiError(404, 'Team not found.')
	}

	return res
		.status(200)
		.json(new ApiResponse(200, 'Project link added successfully', team))
})

const getTeamsInHackathon = asyncHandler(async(req, res) => {
    
    const {hackathonID} = req.params;

    const teams = await Team.find({
        hackathon : hackathonID
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Fetched Teams in the Hackathon successfully.", {teams})
    )

})

export {
	createTeam,
	addMemberToTeam,
	removeMemberfromTeam,
	addProjectLink,
	getTeam,
    getTeamsInHackathon
}
