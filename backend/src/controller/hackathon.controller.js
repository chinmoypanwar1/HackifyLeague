import { Hackathon } from "../models/hackathon.models.js";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";

const createHackathon = asyncHandler(async (req, res) => {

    console.log(req.body)
    
    const { displayName, host, limit, teamMemberLimit, description, location, companyLink, sponsorLink, prizePool, tags, startDate, endDate, RegistrationDeadline } = req.body

    if(!displayName.trim() || !limit || !teamMemberLimit || !description || !location || !companyLink || !sponsorLink || !prizePool || !startDate || !endDate || !RegistrationDeadline) {
        throw new ApiError(400, "Please provide all the fields")
    }
    if(limit < 50 || limit > 3000) {
        throw new ApiError(400, "Limit must be between 50 and 3000")
    }
    if(teamMemberLimit < 1 || teamMemberLimit > 10) {
        throw new ApiError(400, "Team member limit must be between 1 and 10")
    }
    if(startDate < (Date.now() + 5*24*60*60*1000) || endDate < (Date.now() + 7*24*60*60*1000) || RegistrationDeadline < (Date.now() + 3*24*60*60*1000)) {
        throw new ApiError(400, "Start date, end date and registration deadline must be in future")
    }
    if(startDate <= RegistrationDeadline) {
        throw new ApiError(400, "Start date must be after registration deadline")
    }
    if(startDate >= endDate) {
        throw new ApiError(400, "Start date must be before end date")
    }
    if(RegistrationDeadline >= endDate) {
        throw new ApiError(400, "Registration deadline must be before end date")
    }
    let hostUser = [];

    for(let i=0; i<host.length; i++) {
        const existingUser = await User.findOne({username : host[i]})
        if(!existingUser) {
            throw new ApiError(400, "Please provide a valid host.")
        }
        hostUser.push(existingUser._id)
    }

    const existedHackathon = await Hackathon.findOne({displayName});
    if(existedHackathon) {
        throw new ApiError(400, "The hackathon with a similar name already exists.")
    }

    const hackathon = await Hackathon.create({
        displayName,
        host : [],
        limit,
        teamMemberLimit,
        description,
        location,
        companyLink,
        sponsorLink,
        prizePool,
        tags,
        startDate,
        endDate,
        RegistrationDeadline
    })

    console.log(hackathon)


    hackathon.host = hostUser;
    hackathon.save();

    console.log(hackathon)

    return res
    .status(201)
    .json(
        new ApiResponse(201, "Hackathon created successfully")
    )

})

const getHackathons = asyncHandler(async(req, res) => {

    const {page=1, limit=10} = req.query

    const hackathons = await Hackathon.find({
        RegistrationDeadline : { $gte : Date.now()}
    })
    .sort({RegistrationDeadline : 1})
    .skip((page-1)*limit)
    .limit(Number(limit))
    .select("displayName limit teamMemberLimit location prizePool")

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Hackathons fetched successfully", hackathons)
    )

})

const getHackathonById = asyncHandler(async (req, res) => {

    const { hackathonId } = req.params
    const hackathon = await Hackathon.findById(hackathonId)

    console.log(req.params)

    if(!hackathon) {
        throw new ApiError(404, "Please provide a valid hackathon Id.")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Hackathon Data Fetched Successfully.", hackathon)
    )

})

const updateHackathonDetails = asyncHandler(async (req, res) => {

    const user = req.user;
    console.log(user)
    const { 
        displayName, 
        host, 
        limit, 
        teamMemberLimit, 
        description, 
        location, 
        companyLink, 
        sponsorLink, 
        tags, 
        startDate, 
        endDate 
    } = req.body;
    const { hackathonId } = req.params;

    console.log("Update Hackathon consoles.")
    
    const hackathon = await Hackathon.findById(hackathonId);
    console.log(hackathon)
    
    console.log("Update Hackathon consoles.")
    console.log("The type of user._id is : ", typeof(user._id))
    console.log(typeof(hackathon.host[0]))
    if (!hackathon) {
        throw new ApiError(404, "Please provide a valid hackathon Id");
    }

    
    // Check if user is host/admin of the hackathon
    let isHost = hackathon.host.some(hostId => hostId.equals(user._id));
    if (!isHost) {
        throw new ApiError(400, "You are not an admin.");
    }
    
    // Validate deadlines and other constraints
    if (hackathon.startDate < Date.now()) {
        throw new ApiError(400, "You cannot update the hackathon after the registration has ended.");
    }
    if (limit < 50 || limit > 3000) {
        throw new ApiError(400, "Limit must be between 50 and 3000.");
    }
    if (teamMemberLimit < 1 || teamMemberLimit > 6) {
        throw new ApiError(400, "The number of members in a team must be between 1 and 6.");
    }
    if (startDate && startDate < Date.now() + 5 * 24 * 60 * 60 * 1000) {
        throw new ApiError(400, "The start date must be at least 5 days from now.");
    }
    if (endDate && endDate < Date.now() + 7 * 24 * 60 * 60 * 1000) {
        throw new ApiError(400, "The end date must be at least 7 days from now.");
    }

    hackathon.displayName = displayName && displayName.trim() !== '' ? displayName : hackathon.displayName;
    hackathon.host = Array.isArray(host) && host.length > 0 ? [...hackathon.host, ...host] : hackathon.host;
    hackathon.limit = limit !== undefined && limit >= 50 && limit <= 3000 ? limit : hackathon.limit;
    hackathon.teamMemberLimit = teamMemberLimit !== undefined && teamMemberLimit >= 1 && teamMemberLimit <= 6 ? teamMemberLimit : hackathon.teamMemberLimit;
    hackathon.description = description && description.trim() !== '' ? description : hackathon.description;
    hackathon.location = Array.isArray(location) && location.length > 0 ? location : hackathon.location;
    hackathon.companyLink = Array.isArray(companyLink) && companyLink.length > 0 ? companyLink : hackathon.companyLink;
    hackathon.sponsorLink = Array.isArray(sponsorLink) && sponsorLink.length > 0 ? sponsorLink : hackathon.sponsorLink;
    hackathon.tags = Array.isArray(tags) && tags.length > 0 ? tags : hackathon.tags;
    hackathon.startDate = startDate && new Date(startDate) > Date.now() ? new Date(startDate) : hackathon.startDate;
    hackathon.endDate = endDate && new Date(endDate) > hackathon.startDate ? new Date(endDate) : hackathon.endDate;

    await hackathon.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, "Hackathon details updated successfully", hackathon));

});

export {
    createHackathon,
    getHackathons,
    getHackathonById,
    updateHackathonDetails
}