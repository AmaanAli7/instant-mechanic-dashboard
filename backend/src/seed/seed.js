const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const Customer = require("../models/Customer");
const Mechanic = require("../models/Mechanic");
const Service = require("../models/Service");
const Booking = require("../models/Booking");

require("dotenv").config();

const serviceData = [
  {
    name: "General Inspection",
    category: "Inspection",
    basePrice: 499,
    estimatedMinutes: 45,
  },
  {
    name: "Engine Diagnosis",
    category: "Engine",
    basePrice: 999,
    estimatedMinutes: 90,
  },
  {
    name: "Battery Replacement",
    category: "Battery",
    basePrice: 1499,
    estimatedMinutes: 30,
  },
  {
    name: "Flat Tyre Repair",
    category: "Tyres",
    basePrice: 399,
    estimatedMinutes: 30,
  },
  {
    name: "Oil Change",
    category: "Maintenance",
    basePrice: 799,
    estimatedMinutes: 45,
  },
  {
    name: "Brake Service",
    category: "Brakes",
    basePrice: 1299,
    estimatedMinutes: 60,
  },
  {
    name: "AC Service",
    category: "AC",
    basePrice: 1199,
    estimatedMinutes: 75,
  },
  {
    name: "Car Towing",
    category: "Emergency",
    basePrice: 1999,
    estimatedMinutes: 60,
  },
];

const statuses = [
  "pending",
  "assigned",
  "on_the_way",
  "in_progress",
  "completed",
  "cancelled",
];

const cities = [
  "Bhopal",
  "Indore",
  "Noida",
  "Delhi",
  "Gurgaon",
  "Lucknow",
  "Jaipur",
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    // Clear existing data
    await Customer.deleteMany({});
    await Mechanic.deleteMany({});
    await Service.deleteMany({});
    await Booking.deleteMany({});

    console.log("Old data cleared");

    // -------------------------
    // SERVICES
    // -------------------------

    const services = await Service.insertMany(serviceData);

    console.log(`${services.length} services created`);

    // -------------------------
    // CUSTOMERS
    // -------------------------

    const customers = [];

    for (let i = 0; i < 80; i++) {
      customers.push({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.string.numeric(10),
        city: faker.helpers.arrayElement(cities),
      });
    }

    const createdCustomers = await Customer.insertMany(customers);

    console.log(`${createdCustomers.length} customers created`);

    // -------------------------
    // MECHANICS
    // -------------------------

    const mechanics = [];

    for (let i = 0; i < 25; i++) {
      mechanics.push({
        name: faker.person.fullName(),
        phone: faker.string.numeric(10),
        status: faker.helpers.arrayElement([
          "available",
          "busy",
          "offline",
        ]),
        jobsCompleted: faker.number.int({
          min: 10,
          max: 250,
        }),
        rating: Number(
          faker.number.float({
            min: 3.5,
            max: 5,
            fractionDigits: 1,
          })
        ),
      });
    }

    const createdMechanics = await Mechanic.insertMany(mechanics);

    console.log(`${createdMechanics.length} mechanics created`);

    // -------------------------
    // BOOKINGS
    // -------------------------

    const bookings = [];

    for (let i = 0; i < 600; i++) {
      const customer = faker.helpers.arrayElement(
        createdCustomers
      );

      const mechanic = faker.helpers.arrayElement(
        createdMechanics
      );

      const service = faker.helpers.arrayElement(services);

      const status = faker.helpers.arrayElement(statuses);

      const scheduledAt = faker.date.between({
        from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        to: new Date(),
      });

      bookings.push({
        bookingId: `BK-${10000 + i}`,

        customer: customer._id,

        mechanic:
          status === "pending"
            ? null
            : mechanic._id,

        service: service._id,

        vehicle: {
          make: faker.helpers.arrayElement([
            "Hyundai",
            "Maruti",
            "Tata",
            "Honda",
            "Toyota",
            "Mahindra",
            "Kia",
          ]),

          model: faker.helpers.arrayElement([
            "Creta",
            "Swift",
            "Nexon",
            "City",
            "Fortuner",
            "XUV700",
            "Seltos",
          ]),

          registrationNumber: `MP${faker.string.numeric(
            2
          )}${faker.string.alpha({ count: 2 }).toUpperCase()}${faker.string.numeric(
            4
          )}`,
        },

        status,

        amount: faker.number.int({
          min: 399,
          max: 4999,
        }),

        location: {
          address: `${faker.location.streetAddress()}, ${customer.city}`,
          latitude: faker.location.latitude({
            min: 20,
            max: 30,
          }),
          longitude: faker.location.longitude({
            min: 73,
            max: 82,
          }),
        },

        scheduledAt,
      });
    }

    const createdBookings = await Booking.insertMany(bookings);

    console.log(`${createdBookings.length} bookings created`);

    console.log("Database seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);

    process.exit(1);
  }
};

seedDatabase();