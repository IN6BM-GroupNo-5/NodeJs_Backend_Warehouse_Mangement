import { Router } from "express";
import {createClient,getClients,findClient,editClient,deleteClient} from "./client.controller.js";
import {createClientValidator,getClientsValidator,findClientValidator,editClientValidator,deleteClientValidator} from "../middlewares/client-validators.js";

const router = Router();

/**
 * @swagger
 * /client/createClient:
 *   post:
 *     tags:
 *       - Client
 *     summary: Register a new client
 *     description: Allows an administrator to register a new client in the system.
 *     operationId: createClient
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Client data to register
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Client registered successfully.
 *       400:
 *         description: Invalid client data.
 *       500:
 *         description: Internal server error.
 */
router.post("/createClient", createClientValidator, createClient);

/**
 * @swagger
 * /client/getClients:
 *   get:
 *     tags:
 *       - Client
 *     summary: Get all clients
 *     description: Retrieves a list of all registered clients.
 *     operationId: getClients
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved clients.
 *       500:
 *         description: Internal server error.
 */
router.get("/getClients", getClientsValidator, getClients);

/**
 * @swagger
 * /client/findClient/{cid}:
 *   get:
 *     tags:
 *       - Client
 *     summary: Get a client by ID
 *     description: Retrieves a specific client's details by ID.
 *     operationId: findClient
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID of the client to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client found successfully.
 *       400:
 *         description: Invalid ID or client not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/findClient/:cid", findClientValidator, findClient);

/**
 * @swagger
 * /client/editClient/{cid}:
 *   put:
 *     tags:
 *       - Client
 *     summary: Edit client information
 *     description: Allows an administrator to update client details.
 *     operationId: editClient
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID of the client to edit.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated client data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client updated successfully.
 *       400:
 *         description: Invalid data or ID.
 *       500:
 *         description: Internal server error.
 */
router.put("/editClient/:cid", editClientValidator, editClient);

/**
 * @swagger
 * /client/deleteClient/{cid}:
 *   delete:
 *     tags:
 *       - Client
 *     summary: Delete a client
 *     description: Allows an administrator to logically delete a client (set status to false).
 *     operationId: deleteClient
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID of the client to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client deleted successfully.
 *       400:
 *         description: Invalid ID or client not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/deleteClient/:cid", deleteClientValidator, deleteClient);

export default router;
