const express = require("express");

const {
  getDashboardSummary,
} = require("../controllers/dashboardController");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard summary and KPI operations
 */

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard KPI summary retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 totalBookings: 600
 *                 todayBookings: 18
 *                 completedBookings: 420
 *                 pendingBookings: 72
 *                 cancelledBookings: 28
 *                 totalRevenue: 1250000
 *                 activeMechanics: 17
 *                 newCustomers: 9
 *       500:
 *         description: Server error
 */
router.get("/summary", getDashboardSummary);

module.exports = router;