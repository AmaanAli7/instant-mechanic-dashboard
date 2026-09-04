const express = require("express");

const {
  getMechanics,
} = require("../controllers/mechanicController");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Mechanics
 *   description: Mechanic operations
 */

/**
 * @swagger
 * /api/mechanics:
 *   get:
 *     summary: Get all mechanics
 *     tags: [Mechanics]
 *     responses:
 *       200:
 *         description: Mechanics retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: "64abc123"
 *                   name: "Rahul Sharma"
 *                   phone: "9876543210"
 *                   status: "available"
 *                   jobsCompleted: 124
 *                   rating: 4.8
 *       500:
 *         description: Server error
 */
router.get("/", getMechanics);

module.exports = router;