import { Router } from "express";
import { createProduct, getProducts, findProducts, editProduct, deleteProduct } from "./product.controller.js";
import { createProductValidator, getProductsValidator, findProductsValidator, editProductValidator, deleteProductValidator } from "../middlewares/product-validators.js";                   

const router = Router();

/**
 * @swagger
 * /createProduct:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - suplier
 *               - price
 *               - stock
 *               - expireDate
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               suplier:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               expireDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Validation error
 */
router.post("/createProduct", createProductValidator, createProduct);

/**
 * @swagger
 * /getProducts:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all active products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Server error
 */
router.get("/getProducts", getProductsValidator, getProducts);

/**
 * @swagger
 * /findProducts:
 *   get:
 *     tags:
 *       - Products
 *     summary: Search and filter products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pid:
 *                 type: string
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               entryDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Filtered product results
 *       500:
 *         description: Server error
 */
router.get("/findProducts", findProductsValidator, findProducts);

/**
 * @swagger
 * /editProduct/{pid}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Edit a product by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               expireDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Product updated
 *       400:
 *         description: Validation error
 */
router.put("/editProduct/:pid", editProductValidator, editProduct);  // <- corregido aquí con :pid

/**
 * @swagger
 * /deleteProduct/{pid}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Soft-delete a product by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product deleted
 *       400:
 *         description: Validation error
 */
router.delete("/deleteProduct/:pid", deleteProductValidator, deleteProduct);  // <- corregido también aquí con :pid

export default router;

