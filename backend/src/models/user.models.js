import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true,
        },
        fullname : {
            type : String,
            maxlength : 20,
            required : true,
            trim : true
        },
        email : {
            type : String,
            unique : true,
            required : true,
            lowercase : true,
            trim : true,
            index : true
        },
        password : {
            type : String,
            required : true
        },
        resetPasswordToken : {
            type : String,
            default : undefined
        },
        resetPasswordExpires : {
            type : Date,
            default : undefined
        },
        description : {
            type : String,
            required : false
        },
        avatarImage : {
            type : String,   //--> Cloudinary URL
            default : ""
        },
        workRole : {
            type : [String]
        },
        friend : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User'
            }
        ],
        hackathonsParticipated : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Hackathon"
            },
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Team"
            }
        ],
        hackathonsWon : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Hackathon"
            },
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Team"
            }
        ],
        currentHackathons : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Hackathon"
            },
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Team"
            }
        ],
        refreshToken : {
            type : String
        }
    },
    {
        timestamps : true
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign( {
        _id : this._id,
        username : this.username,
        email : this.email
        }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign( {
            _id : this._id
        }, process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);