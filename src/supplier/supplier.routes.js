import { Router } from "express";
import {createSupplier,getSuppliers,findSuppliers ,editSupplier,deleteSupplier } from "./supplier.controller.js";
import {createSupplierValidator,getSuppliersValidator,findSupplierValidator ,editSupplierValidator,deleteSupplierValidator,} from "../middlewares/supplier-validators.js";

const router = Router();

/**
 * @swagger
 * /supplier/createSupplier:
 *   post:
 *     tags:
 *       - Supplier
 *     summary: Register a new supplier
 *     description: Allows an administrator to register a new supplier into the system.
 *     operationId: createSupplier
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Supplier data to register
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - contactEmail
 *             properties:
 *               name:
 *                 type: string
 *               contactEmail:
 *                 type: string
 *     responses:
 *       201:
 *         description: Supplier registered successfully.
 *       400:
 *         description: Invalid supplier data.
 *       500:
 *         description: Internal server error.
 */
router.post("/createSupplier", createSupplierValidator, createSupplier);

/**
 * @swagger
 * /supplier/getSuppliers:
 *   get:
 *     tags:
 *       - Supplier
 *     summary: Get all suppliers
 *     description: Retrieves a list of all registered suppliers.
 *     operationId: getSuppliers
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit the number of results.
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *         description: Skip a number of results.
 *     responses:
 *       200:
 *         description: Successfully retrieved suppliers.
 *       500:
 *         description: Internal server error.
 */
router.get("/getSuppliers", getSuppliersValidator, getSuppliers);

/**
 * @swagger
 * /supplier/findSupplier/{sid}:
 *   get:
 *     tags:
 *       - Supplier
 *     summary: Get a supplier by ID
 *     description: Retrieves a specific supplier's details by its ID. Only available to administrators.
 *     operationId: findSupplier
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sid
 *         required: true
 *         description: The ID of the supplier to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Supplier found successfully.
 *       400:
 *         description: Supplier not found or invalid ID.
 *       500:
 *         description: Internal server error.
 */
router.get("/findSupplier/:sid", findSupplierValidator, findSuppliers);

/**
 * @swagger
 * /supplier/editSupplier/{sid}:
 *   put:
 *     tags:
 *       - Supplier
 *     summary: Edit supplier information
 *     description: Allows an administrator to edit the details of a supplier.
 *     operationId: editSupplier
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sid
 *         required: true
 *         description: The ID of the supplier to be edited.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated supplier data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               contactEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Supplier updated successfully.
 *       400:
 *         description: Invalid data or ID.
 *       500:
 *         description: Internal server error.
 */
router.put("/editSupplier/:sid", editSupplierValidator, editSupplier);

/**
 * @swagger
 * /supplier/deleteSupplier/{sid}:
 *   delete:
 *     tags:
 *       - Supplier
 *     summary: Delete a supplier
 *     description: Allows an administrator to logically delete a supplier (set status to false).
 *     operationId: deleteSupplier
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sid
 *         required: true
 *         description: The ID of the supplier to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Supplier deleted successfully.
 *       400:
 *         description: Invalid ID or supplier not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/deleteSupplier/:sid", deleteSupplierValidator, deleteSupplier);

export default router;
