import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import { ApiError } from './apiError.js'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
	try {
		if (!localFilePath) return null
		const response = await cloudinary.uploader.upload(localFilePath, {
			resource_type: 'auto',
		})
		fs.unlinkSync(localFilePath)
		return response
	} catch (error) {
		fs.unlinkSync(localFilePath) // remove the locally saved file as the uploading failed
	}
}

const deleteOnCloudinary = async (publicId) => {
	try {
		if (!publicId) return null

		const response = await cloudinary.uploader.destroy(publicId, {
			resource_type: 'image',
		})
		return response
	} catch (error) {
		throw new ApiError(500, 'Something went wrong while deleting the images')
	}
}

export { uploadOnCloudinary, deleteOnCloudinary }
