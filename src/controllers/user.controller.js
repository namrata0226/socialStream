import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation - not empty
  //check if user user already exists: username,email
  //check for image , check for avatar
  //upload them to cloudinary,avatar
  //create user object-create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return res
  const { email, password, fullName, username } = req.body;
  console.log("email: ", email);
  // if ( fullName) {
  //   throw new ApiError(400, "All filed is required");
  // }
  if (
    [email, password, fullName, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All filed is required");
  }
  let existedUser = User.findOne({ $or: [{ email }, { username }] }); //It checks first email is existed or not if its not then check username
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  const avatar = await uploadCloudinary(avatarLocalPath);
  const coverImage = await uploadCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }
  //Creating New user
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    email,
    password,
    username: username.toLowerCase(),
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" // It returns all fields except these "-fieldName"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registeringthe user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registerd successfully"));
});
export { registerUser };
