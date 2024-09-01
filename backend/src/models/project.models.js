import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true,
            maxlength : 50
        },
        description : {
            type : String,
            maxlength : 300
        },
        team : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Team"
        },
        hackathon : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Hackathon"
        },
        submissionLink : {
            type : String,
            required : true,
            default : "No URL Provided"
        },
        status : {
            type : String,
            enum : ['ongoing','completed'],
            default : 'ongoing',
            required : true
        },
        tags : {
            type : [String],
            required : true
        }
    },
    {
        timestamps : true
    }
)

export const Project = mongoose.model("Project", projectSchema)