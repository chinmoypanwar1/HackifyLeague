import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema(
    {
        displayName : {
            type : String,
            required : true,
            maxlength : 30
        },
        host : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User"
            },
            {
                type : String,
                required : true,
            }
        ],
        teams : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Team"
            }
        ],
        limit : {
            type : Number,
            min : 50,
            max : 3000
        },
        teamMemberLimit : {
            type : Number,
            required : true,
            min: 1,
            max : 10
        },
        description : {
            type : String,
            required : true
        },
        location : [
            {
                type : [Number],
                required : true
            }
        ],
        companyLink : [
            {
                type : String,
                required : true
            }
        ],
        sponsorLink : [
            {
                type : String,
                required : true
            }
        ],
        prizePool : {
            type : Number,
            required : true
        },
        tags : [
            {
                type : String,
                required : true
            }
        ],
        startDate : {
            type : Date,
            required : true
        },
        RegistrationDeadline : {
            type : Date,
            required : true
        },
        endDate : {
            type : Date,
            required : true
        },
        winner : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Team",
            default : "No winner Yet"
        }
    },
    {
        timestamps : true
    }
)

export const Hackathon = mongoose.model("Hackathon", hackathonSchema);