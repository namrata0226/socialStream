import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
// First we upload file in our local server than we upload it on cloudinary

//Uploading file on local server now
const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File hs been uploaded successfully!!", response.url);
    return response;
  } catch (error) {
    // We delete the locally saved file as the upload operation got failed
    fs.unlinkSync(localFilePath);

    return null;
  }
};
export {uploadCloudinary};
