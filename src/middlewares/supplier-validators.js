import { body, param } from "express-validator";
import { supplierExists } from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createSupplierValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    body("name").notEmpty().withMessage("Supplier name is required").isString().withMessage("Name must be a string"),
    body("contactEmail").notEmpty().withMessage("Contact email is required").isEmail().withMessage("Email is invalid"),
    body("products").optional().isArray().withMessage("Products must be an array"),
    validateFields,
    handleErrors
];

export const getSuppliersValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    validateFields,
    handleErrors
];

export const findSupplierValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    param("sid").isMongoId().withMessage("The id provided is not a valid Mongo ID"),
    param("sid").custom(supplierExists),
    validateFields,
    handleErrors
];

export const editSupplierValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    param("sid").isMongoId().withMessage("The id provided is not a mongo valid ID"),
    param("sid").custom(supplierExists),
    body("name").optional().isString().withMessage("Name must be a string"),
    body("contactEmail").optional().isEmail().withMessage("Email is invalid"),
    body("products").optional().isArray().withMessage("Products must be an array"),
    validateFields,
    handleErrors
];

export const deleteSupplierValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    param("sid").isMongoId().withMessage("The id provided is not a mongo valid ID"),
    param("sid").custom(supplierExists),
    validateFields,
    handleErrors
];
