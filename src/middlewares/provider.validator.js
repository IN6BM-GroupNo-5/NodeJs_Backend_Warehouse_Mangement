import { body } from "express-validator";
import { providerNameExists } from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const registerProviderValidator = [
    body("name")
        .notEmpty().withMessage("El nombre del proveedor es obligatorio")
        .isString().withMessage("El nombre debe ser una cadena de texto")
        .custom(providerNameExists),
    body("contact")
        .notEmpty().withMessage("El contacto del proveedor es obligatorio")
        .isString().withMessage("El contacto debe ser una cadena de texto"),
    body("productsSupplied")
        .optional()
        .isArray().withMessage("La lista de productos debe ser un arreglo de cadenas de texto"),
    validateFields,
    handleErrors
];
