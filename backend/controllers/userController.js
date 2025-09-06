import User from "../models/userModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: `getCurrentUser error ${error}` });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, description } = req.body;

    let photoUrl;
    if (req.file) {
      photoUrl = await uploadOnCloudinary(req.file.path);
    }

    const update = {};
    if (typeof name === "string" && name.trim() !== "") update.name = name;
    if (typeof description === "string") update.description = description;
    if (photoUrl) update.photoUrl = photoUrl;

    const user = await User.findByIdAndUpdate(userId, update, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: `updateProfile error ${error}` });
  }
};

const getCreatorById = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "get Creator error" });
  }
};

export { getCurrentUser, updateProfile, getCreatorById };
