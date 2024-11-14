import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    displayname: {
      type: String,
      required: true,
      maxlength: 30,
      unique : true
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role : {
          type : String,
          enum : ["admin", "member"],
        }
      },
    ],
    description: {
      type: String,
      maxlength: 300,
    },
    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
      required: true,
    },
    project: {
      type: String,
      unique : true
    },
    teamMemberLimit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Team = mongoose.model("Team", teamSchema);