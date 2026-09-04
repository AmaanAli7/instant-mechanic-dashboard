const express = require("express");

const {
  getCustomers,
} = require("../controllers/customerController");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer operations
 */

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Customers retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: "64abc456"
 *                   name: "Aman Khan"
 *                   email: "aman@example.com"
 *                   phone: "9876543210"
 *                   city: "Noida"
 *                   totalBookings: 8
 *       500:
 *         description: Server error
 */
router.get("/", getCustomers);

module.exports = router;