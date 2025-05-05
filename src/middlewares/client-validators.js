import { body, param } from "express-validator";
import { clientExists } from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createClientValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    body("name").notEmpty().withMessage("Client name is required").isString().withMessage("Name must be a string"),
    body("email").notEmpty().withMessage("Client email is required").isEmail().withMessage("Email is invalid"),
    validateFields,
    handleErrors
];

export const getClientsValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    validateFields,
    handleErrors
];

export const findClientValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    param("cid").isMongoId().withMessage("The id provided is not a valid Mongo ID"),
    param("cid").custom(clientExists),
    validateFields,
    handleErrors
];

export const editClientValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    param("cid").isMongoId().withMessage("The id provided is not a valid Mongo ID"),
    param("cid").custom(clientExists),
    body("name").optional().isString().withMessage("Name must be a string"),
    body("email").optional().isEmail().withMessage("Email is invalid"),
    validateFields,
    handleErrors
];

export const deleteClientValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    param("cid").isMongoId().withMessage("The id provided is not a valid Mongo ID"),
    param("cid").custom(clientExists),
    validateFields,
    handleErrors
];
