import { body, param } from "express-validator";
import { supplierExists,validCategory,productFound } from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createProductValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    body("name").notEmpty().withMessage("Products name is required"),
    body("category").notEmpty().withMessage("Products category is required").custom(validCategory),
    body("supplier").isMongoId().withMessage("The id provided is not a mongo valid id").custom(supplierExists),
    body("price").notEmpty().withMessage("The price is required").isNumeric().withMessage("Price can only be a numeric value"),
    body("stock").notEmpty().withMessage("Stock of product is required").isNumeric().withMessage("Price can only be a numeric value"),
    body("expireDate").notEmpty().withMessage("Expire date is required").isDate().withMessage("Expire date must be a valid date"),
    validateFields,
    handleErrors
]

export const getProductsValidator = [
    validateJWT,
    validateFields,
    handleErrors
]

export const findProductsValidator = [
    validateJWT,
    body("pid").optional().isMongoId().withMessage("The id provided is not a mongo valid id").optional().custom(productFound),
    body("name").optional(),
    body("category").optional().custom(validCategory),
    body("entryDate").optional().isDate().withMessage("The entry date must be a valid date"),
    validateFields,
    handleErrors
]


export const editProductValidator = [
    validateJWT,
    param("pid").isMongoId().withMessage("The id provided is not a mongo valid id").custom(productFound),
    body("name").optional(),
    body("category").optional().custom(validCategory),
    body("supplier").optional().isMongoId().withMessage("The id provided is not a mongo valid id").custom(supplierExists),
    body("price").optional().isNumeric().withMessage("Price can only be a numeric value"),
    body("stock").optional().isNumeric().withMessage("Stock can only be a numeric value"),
    body("expireDate").optional().isDate().withMessage("Expire date must be a valid date"),
    validateFields,
    handleErrors
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    param("pid").isMongoId().withMessage("The id provided is not a mongo valid id").custom(productFound),
    body("password").notEmpty().withMessage("Password is required"),
    validateFields,
    handleErrors
]
