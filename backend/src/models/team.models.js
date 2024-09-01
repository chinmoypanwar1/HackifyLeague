import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
    {
        displayname : {
            type : String,
            required : true,
            maxlength : 30
        },
        members : [
            {
                type : mongoose.Schema.ObjectId.ObjectId,
                ref: "User"
            },
            {
                type : String,
                required : true
            }
        ],
        description : {
            type : String,
            required : false,
            maxlength : 300
        },
        invitationId : {
            type : String
        },
        hackathon : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Hackathon"
        },
        project : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Project"
        }
    },
    {
        timestamps : true
    }
)

export const Team = mongoose.model("Team", teamSchema);