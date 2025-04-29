import {body, param} from 'express-validator';
import { emailExists, userExists, adminRole , adminRoleDelete, userUpdateProfile } from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const loginValidator = [
    body("email").notEmpty().isEmail().withMessage("The email is not valid"),
    body("fullName").optional().isString().withMessage("Name must be a string"),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol"),
    validateFields,
    handleErrors
];

export const registerValidator = [
    body("fullName")
        .notEmpty().withMessage("Full name is required")
        .isString().withMessage("Full name must be a string"),    
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email must be valid")
        .custom(emailExists),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage("Password must be at least 8 characters long and include lowercase, uppercase, number, and symbol"),
    validateFields,
    handleErrors
];


export const updateProfileValidator = [
    body("fullName")
        .optional()
        .isString().withMessage("Full name must be a string"),
    body("email")
        .optional()
        .isEmail().withMessage("Email must be valid")
        .custom(emailExists),
    body("password")
        .notEmpty().withMessage("You must provide your current password to update data"),
    validateFields,
    handleErrors
];


export const updateAdminModeValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("uid")
        .notEmpty().withMessage("User ID is required")
        .isMongoId().withMessage("Invalid user ID")
        .custom(userExists)
        .custom(adminRole),
    body("fullName")
        .optional()
        .isString().withMessage("Full name must be a string"),
    body("email")
        .optional()
        .isEmail().withMessage("Email must be valid")
        .custom(emailExists),
    body("password")
        .optional()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage("Password must be strong if provided"),
    validateFields,
    handleErrors
];


export const deactivateAdminModeValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("uid")
        .notEmpty().withMessage("User ID is required")
        .isMongoId().withMessage("Invalid user ID")
        .custom(userExists)
        .custom(adminRoleDelete),
    validateFields,
    handleErrors
];


export const deactivateUserValidator = [
    validateJWT,
    validateFields,
    handleErrors
];
