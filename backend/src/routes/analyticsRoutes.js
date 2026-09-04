const express = require("express");

const {
  getAnalytics,
} = require("../controllers/analyticsController");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Booking and revenue analytics
 */

/**
 * @swagger
 * /api/analytics:
 *   get:
 *     summary: Get booking analytics
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Analytics data retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 bookingsOverTime: []
 *                 revenueOverTime: []
 *                 statusDistribution: []
 *                 serviceBreakdown: []
 *       500:
 *         description: Server error
 */
router.get("/", getAnalytics);

module.exports = router;