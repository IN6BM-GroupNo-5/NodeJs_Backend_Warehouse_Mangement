import { body, param } from "express-validator";
import { productFound } from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const registerEntryValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR", "EMPLOYEE"),
    body("product").notEmpty().withMessage("Product ID is required").isMongoId().withMessage("Invalid Mongo ID").custom(productFound),
    body("quantity").notEmpty().withMessage("Quantity is required").isNumeric().withMessage("Quantity must be numeric"),
    validateFields,
    handleErrors
];

export const registerExitValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR", "EMPLOYEE"),
    body("product").notEmpty().withMessage("Product ID is required").isMongoId().withMessage("Invalid Mongo ID").custom(productFound),
    body("quantity").notEmpty().withMessage("Quantity is required").isNumeric().withMessage("Quantity must be numeric"),
    body("reason").notEmpty().withMessage("Reason is required"),
    body("destination").notEmpty().withMessage("Destination is required"),
    validateFields,
    handleErrors
];

export const getMovementsValidator = [
    validateJWT,
    validateFields,
    handleErrors
];

export const findMovementsValidator = [
    validateJWT,
    param("pid").notEmpty().withMessage("Product ID is required").isMongoId().withMessage("Invalid Mongo ID").custom(productFound),
    validateFields,
    handleErrors
];
