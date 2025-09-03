import User from "../models/userModel.js";

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
    if (req.file) {
      const photoUrl = await uploadOnCloudinary(req.file.path);
    }
    const user = await User.findByIdAndUpdate(userId, {
      name,
      description,
      photoUrl,
    });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: `updateProfile error ${error}` });
  }
};

export { getCurrentUser, updateProfile };
