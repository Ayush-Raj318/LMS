import jwt from "jsonwebtoken";

const genToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return token;
  } catch (error) {
    // console.error("token generation error:", error.message);
    throw new Error("Failed to generate authentication token");
  }
};

export default genToken;
