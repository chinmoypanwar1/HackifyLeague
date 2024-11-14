import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../models/user.models.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import transporter from '../utils/nodeMailer.js'
import { uploadOnCloudinary, deleteOnCloudinary } from '../utils/cloudinary.js'
import { extractPublicId } from 'cloudinary-build-url'
import { Hackathon } from '../models/hackathon.models.js'
import { Team } from '../models/team.models.js'

const generateAccessAndRefreshToken = async (userId) => {
	try {
		const user = await User.findById(userId)
		const accessToken = user.generateAccessToken()
		const refreshToken = user.generateRefreshToken()
		user.refreshToken = refreshToken
		await user.save({ validateBeforeSave: false })

		return { accessToken, refreshToken }
	} catch (error) {
		throw new ApiError(
			500,
			'Something went wrong while generating the access and refresh token'
		)
	}
}

const registerUser = asyncHandler(async (req, res) => {
	// Will register user for both username or email given
	// Required fields - Email, Username, FullName, Password

	const { username, fullname, email, password } = req.body

	if (
		[username, fullname, email, password].some((field) => field?.trim() === '')
	) {
		throw new ApiError(400, 'All fields are required')
	}

	const existedUser = await User.findOne({
		$or: [{ username }, { email }],
	})

	if (existedUser) {
		throw new ApiError(409, 'User with email or username already exists')
	}

	const user = await User.create({
		username: username.toLowerCase().trim(),
		fullname,
		email,
		password,
	})

	const createdUser = await User.findById(user._id).select(
		'-password -refreshToken'
	)

	if (!createdUser) {
		throw new ApiError(500, 'Something went wrong while registering the user')
	}

	return res
		.status(201)
		.json(new ApiResponse(200, 'User Registered Successfully', createdUser))
})

const loginUser = asyncHandler(async (req, res) => {
	const { email, username, password } = req.body

	if (!username && !email) {
		throw new ApiError(400, 'Username or email is required')
	}

	const user = await User.findOne({
		$or: [{ username }, { email }],
	})

	if (!user) {
		throw new ApiError(400, 'User does not exist')
	}

	const isPasswordValid = await user.isPasswordCorrect(password)

	if (!isPasswordValid) {
		throw new ApiError(400, 'Invalid Credentials')
	}

	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		user._id
	)

	const loggedInUser = await User.findById(user._id).select(
		'-password -refreshToken'
	)

	const options = {
		httpOnly: true,
		secure: true,
	}

	return res
		.status(200)
		.cookie('accessToken', accessToken, options)
		.cookie('refreshToken', refreshToken, options)
		.json(
			new ApiResponse(200, 'User logged in Successfully', {
				user: loggedInUser,
				accessToken,
				refreshToken,
			})
		)
})

const logoutUser = asyncHandler(async (req, res) => {
	// Will logout User

	await User.findByIdAndUpdate(
		req.user._id,
		{
			$unset: {
				refreshToken: 1,
			},
		},
		{
			new: true,
		}
	)

	const options = {
		httpOnly: true,
		secure: true,
	}

	return res
		.status(200)
		.clearCookie('accessToken', options)
		.clearCookie('refreshToken', options)
		.json(new ApiResponse(200, 'User has been logged out Successfully', {}))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
	const incomingRefreshToken = req.cookies.refreshToken

	if (!incomingRefreshToken) {
		throw new ApiError(401, 'Unauthorized Access')
	}

	try {
		const decodedToken = jwt.verify(
			incomingRefreshToken,
			process.env.REFRESH_TOKEN_SECRET
		)

		if (!decodedToken) {
			throw new ApiError(401, 'Unauthorized Access')
		}

		const user = User.findById(decodedToken?._id)

		if (!user) {
			throw new ApiError(401, 'Unauthorzed Access')
		}

		if (decodedToken !== user?.refreshToken) {
			throw new ApiError(
				401,
				'Your refresh Token has been expired. The user need to get logged In'
			)
		}

		const options = {
			httpOnly: true,
			secure: true,
		}

		const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
			user._id
		)

		return res
			.status(200)
			.cookie('accessToken', accessToken, options)
			.cookie('refreshToken', refreshToken, options)
			.json(
				new ApiResponse(200, 'Access Token Refreshed', {
					accessToken,
					refreshToken,
				})
			)
	} catch (error) {
		throw new ApiError(400, 'Invalid Refresh Token')
	}
})

const forgotPasswordMail = asyncHandler(async (req, res) => {
	const { email } = req.body

	if (!email && !validateEmail(email)) {
		throw new ApiError(400, 'Please enter a valid email address')
	}

	const user = await User.findOne({ email })

	if (!user) {
		throw new ApiError(404, 'User not found')
	}

	const resetToken = crypto.randomBytes(32).toString('hex')

	user.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex')
	user.resetPasswordExpires = Date.now() + 15 * 60 * 1000

	await user.save({ validateBeforeSave: false })

	const resetURL = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

	const mailOptions = {
		from: '"Password Reset" <noreply@Hackify.com>',
		to: user.email,
		subject: 'Password Reset Request',
		text: `You have requested to reset your password. Click here: ${resetURL}`,
		html: `<p>You requested a password reset. Click <a href="${resetURL}">here</a> to reset your password.</p>`,
	}

	try {
		await transporter.sendMail(mailOptions)

		return res
			.status(200)
			.json(
				new ApiResponse(
					200,
					'The reset Password URL has been sent to your email'
				)
			)
	} catch (error) {
		user.resetPasswordToken = undefined
		user.resetPasswordExpires = undefined
		await user.save({ validateBeforeSave: false })

		throw new ApiError(500, 'Internal Server Error')
	}
})

const resetPassword = asyncHandler(async (req, res) => {
	const { resetToken } = req.params
	const { password } = req.body

	const hashedToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex')
	const user = await User.findOne({
		resetPasswordToken: hashedToken,
		resetPasswordExpires: { $gt: Date.now() }, // Token must be unexpired
	})

	if (!user) {
		throw new ApiError(400, 'Invalid or expired reset token')
	}

	user.password = password
	user.resetPasswordToken = undefined
	user.resetPasswordExpires = undefined

	await user.save()

	return res
		.status(200)
		.json(new ApiResponse(200, 'Password has been reset successfully.'))
})

const getUser = asyncHandler(async (req, res) => {
	try {
		const userId = req.user._id

		const user = await User.findById(userId).select('-password -refreshToken')
		if (!user) {
			throw new ApiError(404, 'User not found')
		}

		const teams = await Team.find({ 'members.user': userId }).populate(
			'hackathon',
			'displayName'
		)

		const participatedHackathons = await Hackathon.find({
			_id: { $in: teams.map((team) => team.hackathon._id) },
		})

		const data = {
			user: user.toObject(),
			teams,
			participatedHackathons,
		}

		return res
			.status(200)
			.json(new ApiResponse(200, 'User data fetched successfully', data))
	} catch (error) {
		console.error(error)
		throw new ApiError(500, 'Failed to get user details')
	}
})

const changePassword = asyncHandler(async (req, res) => {
	const { oldPassword, newPassword } = req.body

	const user = await User.findById(req.user?._id)
	const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

	if (!isPasswordCorrect) {
		throw new ApiError(400, 'Invalid old password')
	}

	user.password = newPassword
	await user.save({ validateBeforeSave: false })

	return res
		.status(200)
		.json(new ApiResponse(200, 'Password changed successfully', {}))
})

const changeAccountDetails = asyncHandler(async (req, res) => {
	const { fullname, description, workRoles } = req.body

	if (fullname.trim() === '') {
		throw new ApiError(400, 'Please provide all the fields')
	}
	if (description.trim() === '') {
		throw new ApiError(400, 'Please provide all the fields')
	}
	if (
		!Array.isArray(workRoles) ||
		!workRoles.every((role) => typeof role === 'string')
	) {
		throw new ApiError(400, 'Work roles must be an array of strings')
	}

	const user = await User.findById(req.user._id)

	user.fullname = fullname
	user.description = description
	user.workRole = workRoles

	try {
		await user.save({ validateBeforeSave: false })

		return res
			.status(200)
			.json(
				new ApiResponse(200, "User's account detail has been updated", user)
			)
	} catch (error) {
		throw new ApiResponse(500, 'Internal Server Error')
	}
})

const uploadAvatarImage = asyncHandler(async (req, res) => {
	try {
		const user = req.user
		const avatarImage = req.file?.path

		if (!avatarImage) {
			throw new ApiError(400, 'Please upload a file')
		}

		const avatar = await uploadOnCloudinary(avatarImage)

		if (!avatar) {
			throw new ApiError(400, 'Avatar file is required')
		}

		const newUser = await User.findByIdAndUpdate(
			user?._id,
			{
				avatarImage: avatar?.url,
			},
			{ new: true }
		).select('-password -refreshToken')

		return res.json(
			new ApiResponse(200, 'Avatar Image Uploaded Successfully', newUser)
		)
	} catch (error) {
		throw new ApiError(500, 'Error uploading the avatar image.')
	}
})

const updateAvatarImage = asyncHandler(async (req, res) => {
	try {
		const user = req.user
		const publicId = extractPublicId(user?.avatarImage)
		const avatarImage = req.file?.path

		if (!avatarImage) {
			throw new ApiError(400, 'Please upload a file')
		}

		const response = await deleteOnCloudinary(publicId)
		if (!response) {
			throw new ApiError(400, 'Avatar File is Required')
		}

		const avatar = await uploadOnCloudinary(avatarImage)

		if (!avatar) {
			throw new ApiError(400, 'Avatar file is required')
		}

		const newUser = await User.findByIdAndUpdate(
			user?._id,
			{
				avatarImage: avatar?.url,
			},
			{ new: true }
		).select('-password -refreshToken')

		return res.json(
			new ApiResponse(200, 'Avatar Image Uploaded Successfully', newUser)
		)
	} catch (error) {
		throw new ApiError(500, 'Internal Server Error')
	}
})

const searchUsers = asyncHandler(async (req, res) => {
	const userId = req.user._id
	const { username } = req.body

	if (typeof username !== 'string' || username.trim() === '') {
		throw new ApiError(400, 'Please insert a username.')
	}

	const users = await User.find(
		{
			$text: { $search: username },
			_id: { $ne: userId },
		},
		{
			score: { $meta: 'textScore' },
		}
	)
		.select('username _id')
		.sort({ score: { $meta: 'textScore' } })
		.limit(10)

	return res
		.status(200)
		.json(new ApiResponse(200, 'User results fetched successfully.', users))
})

export {
	registerUser,
	loginUser,
	refreshAccessToken,
	logoutUser,
	forgotPasswordMail,
	resetPassword,
	getUser,
	changePassword,
	changeAccountDetails,
	uploadAvatarImage,
	updateAvatarImage,
	searchUsers,
}
