import { verifyJWT } from "../utils/tokenUtils.js";
import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customError.js";

export const authenticateUser = (req, res, next) => {
  try {
      // 1️⃣ Check if token exists in cookies
      const { token } = req.cookies;
      if (!token) {
          console.log("❌ No token found in cookies");
          return res.status(401).json({ msg: "Unauthenticated user" }); // ✅ Prevents server crash
      }

      console.log("✅ Token found:", token);

      // 2️⃣ Verify the token
      const decoded = verifyJWT(token);
      if (!decoded) {
          console.log("❌ Token verification failed");
          return res.status(401).json({ msg: "Authentication invalid: Token verification failed" });
      }

      console.log("✅ Decoded Token:", decoded);

      // 3️⃣ Attach user info to request
      const { userId, role } = decoded;
      const testUser = role === "admin"; // Define testUser properly
      req.user = { userId, role, testUser };

      console.log(`✅ User Authenticated: ${userId}, Role: ${role}`);

      next(); // ✅ Proceed to next middleware
  } catch (error) {
      console.error("❌ Authentication Error:", error.message);
      return res.status(401).json({ msg: "Authentication invalid", error: error.message });
  }
};
export const authorizedPermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unaathorized to access this information");
    }
    next();
  };
};
