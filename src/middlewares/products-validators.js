import { body, param } from "express-validator";
import { productoExists } from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js"; 

const allowedCategories = ["Electronics", "Clothing", "Food", "Home", "Toys", "Others"];

export const createProductValidator = [
    validateJWT, 
    hasRoles("ADMIN"), 
    body("productName").notEmpty().withMessage("The product name is required"),
    body("productDescription").notEmpty().withMessage("The product description is required"),
    body("productPrice").notEmpty().withMessage("The product price is required").isNumeric().withMessage("The product price must be a number"),
    body("stock").notEmpty().withMessage("The stock is required").isInt({ min: 0 }).withMessage("The stock must be a non-negative integer"),
    body("category").notEmpty().withMessage("The category is required").isIn(allowedCategories).withMessage(`The category must be one of the following: ${allowedCategories.join(", ")}`),
    body("entryDate").optional().isISO8601().withMessage("The entry date must be a valid ISO 8601 date"),
    validateFields,
    handleErrors
];

export const updateProductValidator = [
    validateJWT, 
    hasRoles("ADMIN"), 
    body("productName").optional().notEmpty().withMessage("The product name cannot be empty"),
    body("productDescription").optional().notEmpty().withMessage("The product description cannot be empty"),
    body("productPrice").optional().isNumeric().withMessage("The product price must be a number"),
    body("stock").optional().isInt({ min: 0 }).withMessage("The stock must be a non-negative integer"),
    body("category").optional().isIn(allowedCategories).withMessage(`The category must be one of the following: ${allowedCategories.join(", ")}`),
    body("entryDate").optional().isISO8601().withMessage("The entry date must be a valid ISO 8601 date"),
    validateFields,
    handleErrors
];

export const deleteProductValidator = [
    validateJWT, 
    hasRoles("ADMIN"), 
    param("id").notEmpty().withMessage("The product ID is required").custom(productoExists),
    validateFields,
    handleErrors
];

export const filterProductsValidator = [
    validateJWT, 
    hasRoles("ADMIN"), 
    body("productName").optional().isString().withMessage("The product name must be a string"),
    body("category").optional().isIn(allowedCategories).withMessage(`The category must be one of the following: ${allowedCategories.join(", ")}`),
    body("minPrice").optional().isNumeric().withMessage("The minimum price must be a number"),
    body("maxPrice").optional().isNumeric().withMessage("The maximum price must be a number"),
    body("startDate").optional().isISO8601().withMessage("The start date must be a valid ISO 8601 date"),
    body("endDate").optional().isISO8601().withMessage("The end date must be a valid ISO 8601 date"),
    validateFields,
    handleErrors
];