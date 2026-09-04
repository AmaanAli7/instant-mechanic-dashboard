const express = require("express");

const {
  getBookings,
  createBooking,
  updateBookingStatus,
} = require("../controllers/bookingController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Vehicle service booking operations
 */

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get bookings
 *     tags: [Bookings]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of bookings per page
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search bookings by booking ID
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - pending
 *             - assigned
 *             - on_the_way
 *             - in_progress
 *             - completed
 *             - cancelled
 *         description: Filter by booking status
 *
 *     responses:
 *       200:
 *         description: Successfully retrieved bookings
 *       500:
 *         description: Server error
 */

router.get("/", getBookings);
/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer
 *               - service
 *               - vehicle
 *               - amount
 *               - scheduledAt
 *             properties:
 *               customer:
 *                 type: string
 *                 description: MongoDB Customer ObjectId
 *               mechanic:
 *                 type: string
 *                 description: MongoDB Mechanic ObjectId
 *               service:
 *                 type: string
 *                 description: MongoDB Service ObjectId
 *               vehicle:
 *                 type: object
 *                 properties:
 *                   make:
 *                     type: string
 *                   model:
 *                     type: string
 *                   number:
 *                     type: string
 *               amount:
 *                 type: number
 *                 example: 2500
 *               location:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *               scheduledAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       500:
 *         description: Server error
 */
router.post("/", createBooking);
/**
 * @swagger
 * /api/bookings/{id}/status:
 *   patch:
 *     summary: Update booking status
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB booking ObjectId
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - assigned
 *                   - on_the_way
 *                   - in_progress
 *                   - completed
 *                   - cancelled
 *                 example: in_progress
 *
 *     responses:
 *       200:
 *         description: Booking status updated successfully
 *       400:
 *         description: Invalid booking status
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.patch("/:id/status", updateBookingStatus);

module.exports = router;