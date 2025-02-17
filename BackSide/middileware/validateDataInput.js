import { body, validationResult } from "express-validator";
import Data from "../model/data.js";
import User from "../model/users.js";
const withValidation = (validation) => {
  return [
    validation,
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Extract only the first error message
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, msg: errorMessage });
      }
      next();
    },
  ];
};

export const validationData = withValidation([
  body("name")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isString()
    .withMessage("Name must be a string"),

  body("age")
    .notEmpty()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be a number"),

  body("phone")
    .notEmpty()
    .withMessage("Phone cannot be empty")
    .isNumeric()
    .withMessage("Phone must be a number"),

  body("email")
    .isEmail()
    .withMessage("Email must be a valid email")
    .custom(async (email) => {
      try {
        const user = await Data.findOne({ email });
        if (user) {
          throw new Error("Email already exists");
        }
      } catch (error) {
        return Promise.reject("Database error: " + error.message);
      }
    }),
]);

export const valideUpdatingData = withValidation([
  body("name")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isString()
    .withMessage("Name must be a string"),

  body("age")
    .notEmpty()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be a number"),

  body("phone")
    .notEmpty()
    .withMessage("Phone cannot be empty")
    .isNumeric()
    .withMessage("Phone must be a number"),

  body("email")
    .isEmail()
    .withMessage("Email must be a valid email")
    .custom(async (email, { req }) => {
      try {
        const user = await Data.findOne({ email });
        //console.log(user);
        //console.log(req.data);
        if (user && user._id.toString() !== req.body._id) {
          throw new Error("Email already exists");
        }
      } catch (error) {
        return Promise.reject(error.message);
      }
    }),
]);

export const validationRegister = withValidation([
  body("name")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isString()
    .withMessage("Name must be a string"),

  body("lastName")
    .notEmpty()
    .withMessage("last name cannot be empty")
    .isString()
    .withMessage("last name must be a text"),

  body("location")
    .notEmpty()
    .withMessage("Phone cannot be empty")
    .isString()
    .withMessage("Phone must be a text"),

  body("email")
    .isEmail()
    .withMessage("Email must be a valid email")
    .custom(async (email) => {
      try {
        const user = await User.findOne({ email });
        if (user) {
          throw new Error("Email already exists");
        }
      } catch (error) {
        return Promise.reject(error.message);
      }
      body("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password must be at least 8 characters long");
    }),
]);

export const validateLogin = withValidation([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);
