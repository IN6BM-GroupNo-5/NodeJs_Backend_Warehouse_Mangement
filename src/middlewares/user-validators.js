import { body, param } from "express-validator";
import { emailExists, userExists,validRole } from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const loginValidator = [
    body("email").notEmpty().withMessage("Email is required").isString().withMessage("Email must be a string")
    .isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
    validateFields,
    handleErrors
];

export const createUserValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    body("completeName").notEmpty().withMessage("your complete name is required"),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Email is invalid").custom(emailExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    body("role").notEmpty().withMessage("Role is required"),
    body("role").custom(validRole),
    validateFields,
    handleErrors
];

export const getUsersValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    validateFields, 
    handleErrors    
]

export const findUserValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    param("uid").isMongoId().withMessage("The id provided is not a valid Mongo ID"),
    param("uid").custom(userExists),
    validateFields,
    handleErrors
];


export const editUserValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    param("uid").isMongoId().withMessage("The id provided is not a mongo valid ID"),
    param("uid").custom(userExists),
    body("email").optional().isEmail().withMessage("Email is invalid"),
    body("completeName").optional().isString().withMessage("completeName cannot be diferent but only text"),
    body("role").optional().custom(validRole),
    body("password").optional().isStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage("Password must be strong"),
    validateFields,
    handleErrors
];

export const deleteUserValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    param("uid").isMongoId().withMessage("The id provided is not a mongo valid ID"),
    param("uid").custom(userExists),
    validateFields,
    handleErrors
];
