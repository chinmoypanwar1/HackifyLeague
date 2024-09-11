import {v2 as cloudinary} from "cloudinary"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret : process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

const deleteOnCloudinary = async (publicId) => {
    try {
        if(!publicId) return null
        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type : "auto"
        })
        return response
    } catch (error) {
        return null
    }
}

export {uploadOnCloudinary}