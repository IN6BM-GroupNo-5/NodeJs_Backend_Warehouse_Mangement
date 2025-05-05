import { Router } from "express";
import { createUser, getUsers, findUser, editUser, deleteUser } from "./user.controller.js";
import { createUserValidator, getUsersValidator, findUserValidator, editUserValidator, deleteUserValidator } from "../middlewares/user-validators.js";

const router = Router();
/**
 * @swagger
 * /user/createUser:
 *   post:
 *     tags:
 *       - User
 *     summary: Create a new user
 *     description: Allows an administrator to create a new user in the system.
 *     operationId: createUser
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User data to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - completeName
 *               - email
 *               - password
 *               - role
 *             properties:
 *               completeName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Invalid user data or role.
 *       500:
 *         description: Internal server error.
 */
router.post("/createUser", createUserValidator, createUser);

/**
 * @swagger
 * /user/getUsers:
 *   get:
 *     tags:
 *       - User
 *     summary: Get all users
 *     description: Retrieves all registered users. Only accessible by administrators.
 *     operationId: getUsers
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved users.
 *       403:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.get("/getUsers", getUsersValidator, getUsers);

/**
 * @swagger
 * /user/findUser/{uid}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get a user by ID
 *     description: Retrieves a specific user's details by their ID. Only accessible by administrators.
 *     operationId: findUser
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found successfully.
 *       400:
 *         description: User not found or invalid ID.
 *       500:
 *         description: Internal server error.
 */
router.get("/findUser/:uid", findUserValidator, findUser);

/**
 * @swagger
 * /user/editUser/{uid}:
 *   post:
 *     tags:
 *       - User
 *     summary: Edit a user
 *     description: Allows an administrator to edit a user's information.
 *     operationId: editUser
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: The ID of the user to be edited.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated user data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completeName:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Invalid data or ID.
 *       500:
 *         description: Internal server error.
 */
router.put("/editUser/:uid", editUserValidator, editUser);

/**
 * @swagger
 * /user/deleteUser/{uid}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete a user
 *     description: Allows an administrator to delete a user account.
 *     operationId: deleteUser
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: The ID of the user to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       400:
 *         description: Invalid ID or unauthorized deletion.
 *       500:
 *         description: Internal server error.
 */
router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser);

export default router;
