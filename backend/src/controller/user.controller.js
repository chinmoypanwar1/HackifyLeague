import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async(userId) => {
    try {

        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken};

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating the access and refresh token")
    }
}

const registerUser = asyncHandler( async(req, res) => {
    
    // Will register user for both username or email given
    // Required fields - Email, Username, FullName, Password

    const {username, fullname, email, password} = req.body
    if(
        [username,fullname,email,password].some((field) => (
            field?.trim() === ""
        ))
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or : [ {username} , {email}]
    })

    if(existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await User.create({
        username : username.toLowerCase().trim(),
        fullname,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )

})

const loginUser = asyncHandler( async(req, res) => {

    const {email, username, password} = req.body

    if(!username && !email) {
        throw new ApiError(400, "Username or email is required")
    }

    const user = await User.findOne({
        $or : [ {username} , {email}]
    })

    if(!user) {
        throw new ApiError(400, "User does not exist");
    }

    const isPasswordValid = user.isPasswordCorrect(password);

    if(!isPasswordValid) {
        throw new ApiError(400, "Invalid Credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user : loggedInUser, accessToken, refreshToken
            },
            "User logged in Successfully"
        )
    )

})

const logoutUser = asyncHandler( async(req, res) => {

    // Will logout User

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset : {
                refreshToken : 1
            }
        },
        {
            new : true
        }
    )
    
    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User has been logged out Successfully"
        )
    )
})

const refreshAccessToken = asyncHandler( async(req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken

    if(!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Access")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        if(!decodedToken) {
            throw new ApiError(401, "Unauthorized Access")
        }
    
        const user = User.findById(decodedToken?._id)
    
        if(!user) {
            throw new ApiError(401, "Unauthorzed Access")
        }
    
        if(decodedToken !== user?.refreshToken) {
            throw new ApiError(401, "Your refresh Token has been expired. The user need to get logged In")
        }
    
        const options = {
            httpOnly : true,
            secure : true
        }
    
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken},
                "Access Token Refreshed"
            )
        )

    } catch (error) {
        throw new ApiError(400, "Invalid Refresh Token")
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

	const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

	const mailOptions = {
	from: '"Password Reset" <noreply@Hackify.com>',
	to: user.email,
	subject: 'Password Reset Request',
	text: `You have requested to reset your password. Click here: ${resetURL}`,
	html: `<p>You requested a password reset. Click <a href="${resetURL}">here</a> to reset your password.</p>`,
	};

    try {

		await transporter.sendMail(mailOptions);

	return res
	.status(200)
	.json(
		new ApiResponse(
			200,
			user,
			"Updated fullname Successfully"
		)
	)


})

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "The reset Password URL has been sent to your email"
            )
        )

    } catch (error) {

        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await user.save({validateBeforeSave : false})

        throw new ApiError(500, "Internal Server Error")
    }

})

const resetPassword = asyncHandler(async (req, res) => {

    const { resetToken } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }, // Token must be unexpired
    });

    if (!user) {
        throw new ApiError(400, 'Invalid or expired reset token');
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json(new ApiResponse(200, "Password has been reset successfully."));
});

export {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,

}