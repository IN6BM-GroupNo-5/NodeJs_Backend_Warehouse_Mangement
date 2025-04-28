import { Router } from "express";
import { registerUser, updateUser, deactivateUser, updateAdminMode, deactivateUserAdminMode } from "./user.controller.js";
import { createUserValidator, updateUserValidator, deleteUserValidator, deleteUserAdminModeValidator, updateAdminValidator } from "../middlewares/user.validator.js";

const router = Router();

/**
 * @swagger
 * /addUser:
 *   post:
 *     summary: Creates a new user
 *     tags: [Users]
 *     requestBody:
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully created
 *       400:
 *         description: Data validation error
 */
router.post("/addUser", createUserValidator, registerUser);

/**
 * @swagger
 * /updateUser:
 *   put:
 *     summary: Updates an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully updated
 *       400:
 *         description: Data validation error
 */
router.put("/updateUser/", updateUserValidator, updateUser);

/**
 * @swagger
 * /updateAdminMode/{uid}:
 *   put:
 *     summary: Updates a user's admin mode
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               adminMode:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Admin mode successfully updated
 *       400:
 *         description: Data validation error
 */
router.put("/updateAdminMode/:uid", updateAdminValidator, updateAdminMode);

/**
 * @swagger
 * /deleteUserAdminMode/{uid}:
 *   patch:
 *     summary: Deactivates a user in admin mode
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User successfully deactivated
 *       400:
 *         description: Data validation error
 */
router.patch("/deleteUserAdminMode/:uid", deleteUserAdminModeValidator, deactivateUserAdminMode);

/**
 * @swagger
 * /deleteUser:
 *   patch:
 *     summary: Deactivates a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully deactivated
 *       400:
 *         description: Data validation error
 */
router.patch("/deleteUser/", deleteUserValidator, deactivateUser);

export default router;