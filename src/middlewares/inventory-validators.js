import { body } from "express-validator";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const getInventoryValidator = [
  validateJWT,
  hasRoles("ADMINISTRATOR", "EMPLOYEE"),
  validateFields,
  handleErrors
];

export const getMovementsInventoryValidator = [
  validateJWT,
  hasRoles("ADMINISTRATOR", "EMPLOYEE"),
  body("fromDate").isISO8601().withMessage("fromDate must be a valid date"),
  body("toDate").isISO8601().withMessage("toDate must be a valid date"),
  validateFields, 
  handleErrors
];

export const generateInventoryPDFValidator = [
  validateJWT,
  hasRoles("ADMINISTRATOR", "EMPLOYEE"),
  validateFields,
  handleErrors
];

export const generateMovementsPDFValidator = [
  validateJWT,
  hasRoles("ADMINISTRATOR", "EMPLOYEE"),
  body("fromDate").isISO8601().withMessage("fromDate must be a valid date"),
  body("toDate").isISO8601().withMessage("toDate must be a valid date"),
  validateFields,
  handleErrors
];

export const getProductStatsValidator = [
  validateJWT,
  hasRoles("ADMINISTRATOR", "EMPLOYEE"),
  body("fromDate").optional().isISO8601().withMessage("fromDate must be a valid date"),
  body("toDate").optional().isISO8601().withMessage("toDate must be a valid date"),
  validateFields,
  handleErrors
];
