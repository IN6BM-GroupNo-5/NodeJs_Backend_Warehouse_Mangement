import { body } from "express-validator";
import { clientNameExists } from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const registerClientValidator = [
    body("name")
        .notEmpty().withMessage("El nombre del cliente es obligatorio")
        .isString().withMessage("El nombre debe ser una cadena de texto")
        .custom(clientNameExists),
    body("contact")
        .notEmpty().withMessage("El contacto del cliente es obligatorio")
        .isString().withMessage("El contacto debe ser una cadena de texto"),
    body("company")
        .optional()
        .isString().withMessage("El nombre de la empresa debe ser una cadena de texto"),
    validateFields,
    handleErrors
];
