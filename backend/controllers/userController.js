import User from "../models/userModel.js";

const getCurrentUser = async (req,res) => {
    try {
        const user = await User.findById(req.userId).select("-password")
         if(!user){
            return res.status(400).json({message:"User does not exist"})
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"get current user error"})
    }
}

export {getCurrentUser}