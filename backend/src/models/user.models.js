import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true,
            maxlength : 12
        },
        fullname : {
            type : String,
            required : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            lowercase : true,
            trim : true,
            index : true
        },
        password : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : false
        },
        avatarImage : {
            type : String   //--> Cloudinary URL
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
            }
        ],
        hackathonsWon : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Hackathon"
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

export const User = mongoose.model("User", userSchema);