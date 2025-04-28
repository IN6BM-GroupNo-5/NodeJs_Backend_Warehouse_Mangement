import { body, param } from "express-validator";
import { productExists } from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

const allowedCategories = ["Electronics", "Clothing", "Food", "Home", "Toys", "Others"];

export const createProductValidator = [
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
    param("id").notEmpty().withMessage("The product ID is required").custom(productExists),
    validateFields,
    handleErrors
];

export const searchProductsByNameValidator = [
    body("productName").optional().isString().withMessage("The product name must be a string"),
    validateFields,
    handleErrors
];

export const productsByCategoryValidator = [
    param("category").notEmpty().withMessage("The category is required")
        .isIn(allowedCategories).withMessage(`The category must be one of the following: ${allowedCategories.join(", ")}`),
    validateFields,
    handleErrors
];

export const productsByDateValidator = [
    body("startDate").notEmpty().withMessage("The start date is required").isISO8601().withMessage("The start date must be a valid ISO 8601 date"),
    body("endDate").notEmpty().withMessage("The end date is required").isISO8601().withMessage("The end date must be a valid ISO 8601 date"),
    validateFields,
    handleErrors
];