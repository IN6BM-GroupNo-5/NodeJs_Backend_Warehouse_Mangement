import { Router } from "express";
import { registerEntry, registerExit, getMovements, findMovements } from "./movement.controller.js";
import { getProductsInventory, generateInventoryPDF, getMovementsInventory, generateMovementsPDF, getProductStats } from "./inventory.controller.js";
import { registerEntryValidator, registerExitValidator, getMovementsValidator, findMovementsValidator } from "../middlewares/movement-validators.js";
import { getInventoryValidator, generateInventoryPDFValidator, getMovementsInventoryValidator, generateMovementsPDFValidator, getProductStatsValidator } from "../middlewares/inventory-validators.js";

const router = Router();

/* === MOVEMENTS === */

/**
 * @swagger
 * /registerEntry:
 *   post:
 *     tags:
 *       - Movements
 *     summary: Register a new product entry
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product, quantity]
 *             properties:
 *               product:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Entry registered
 */
router.post("/registerEntry", registerEntryValidator, registerEntry);

/**
 * @swagger
 * /registerExit:
 *   post:
 *     tags:
 *       - Movements
 *     summary: Register a new product exit
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product, quantity, reason, destination]
 *             properties:
 *               product:
 *                 type: string
 *               quantity:
 *                 type: number
 *               reason:
 *                 type: string
 *               destination:
 *                 type: string
 *     responses:
 *       201:
 *         description: Exit registered
 */
router.post("/registerExit", registerExitValidator, registerExit);

/**
 * @swagger
 * /getMovements:
 *   get:
 *     tags:
 *       - Movements
 *     summary: Get all movements
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
 *         description: Movements retrieved
 */
router.get("/getMovements", getMovementsValidator, getMovements);

/**
 * @swagger
 * /findMovements/{pid}:
 *   post:
 *     tags:
 *       - Movements
 *     summary: Search and filter movements
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movements found
 */
router.get("/findMovements/:pid", findMovementsValidator, findMovements);

/* === INVENTORY === */

/**
 * @swagger
 * /inventory:
 *   get:
 *     tags:
 *       - Inventory
 *     summary: Get current product inventory
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
 *         description: Inventory retrieved
 */
router.get("/productsInventory", getInventoryValidator, getProductsInventory);

/**
 * @swagger
 * /inventory/pdf:
 *   get:
 *     tags:
 *       - Inventory
 *     summary: Generate PDF report of current inventory
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: PDF generated
 */
router.get("/productsInventory/pdf", generateInventoryPDFValidator, generateInventoryPDF);

/**
 * @swagger
 * /inventory/movements:
 *   post:
 *     tags:
 *       - Inventory
 *     summary: Get inventory movements by date range
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromDate:
 *                 type: string
 *                 format: date
 *               toDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Movements retrieved
 */
router.post("/movementsInventory", getMovementsInventoryValidator, getMovementsInventory);

/**
 * @swagger
 * /inventory/movements/pdf:
 *   post:
 *     tags:
 *       - Inventory
 *     summary: Generate PDF report of inventory movements
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromDate:
 *                 type: string
 *                 format: date
 *               toDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: PDF generated
 */
router.post("/movementsInventory/pdf", generateMovementsPDFValidator, generateMovementsPDF);

/**
 * @swagger
 * /inventory/stats:
 *   post:
 *     tags:
 *       - Inventory
 *     summary: Get product statistics
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromDate:
 *                 type: string
 *                 format: date
 *               toDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Stats retrieved
 */
router.post("/productsStats", getProductStatsValidator, getProductStats);

export default router;
