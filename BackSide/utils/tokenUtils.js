import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d", // Default to "1d" if not defined
  });
  return token;
};

export const verifyJWT = (token) => {
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
  } catch (error) {
      console.error("❌ JWT Verification Failed:", error.message); // ✅ Log the exact JWT error
      return null;
  }
};