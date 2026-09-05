# Instant Mechanic — Live Vehicle Service Operations Dashboard

A modern, responsive and real-time vehicle service operations dashboard built for managing bookings, mechanics, customers and service analytics.

The dashboard provides live operational visibility using REST APIs, MongoDB and Socket.IO.

## 🚀 Live Demo

- Frontend: https://instant-mechanic-dashboard-one.vercel.app/
- Backend API: https://instant-mechanic-dashboard-6p91.onrender.com/
- Swagger API Docs: https://instant-mechanic-dashboard-6p91.onrender.com/api-docs

---

## ✨ Features

### Dashboard
- Total bookings
- Today's bookings
- Completed bookings
- Pending bookings
- Cancelled bookings
- Total revenue
- Active mechanics
- New customers
- Real-time activity feed
- Live connection indicator

### Booking Management
- View bookings
- Search bookings
- Filter by status
- Sort bookings
- Pagination
- View booking details
- Update booking status
- Real-time booking updates

### Mechanics
- View mechanics
- Search mechanics
- Monitor mechanic availability
- Responsive data table

### Customers
- View customers
- Search customers
- Customer contact information
- Responsive data table

### Analytics
- Booking analytics
- Service analytics
- Revenue insights
- Visual charts
- Responsive analytics layout

### Real-Time Operations
Socket.IO is used to provide real-time operational updates.

When a booking is created:

1. The booking is stored in MongoDB.
2. The backend emits a `booking:created` event.
3. Connected dashboards receive the event.
4. The dashboard refreshes its summary.
5. KPI cards and the Live Activity feed update immediately.

Booking status changes follow the same real-time architecture using:

`booking:status-updated`

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React
- Socket.IO Client

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- Swagger / OpenAPI

### Deployment
- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## 🏗️ Architecture

```text
                  ┌─────────────────────┐
                  │   React Frontend    │
                  │       Vercel        │
                  └──────────┬──────────┘
                             │
                  REST API + Socket.IO
                             │
                             ▼
                  ┌─────────────────────┐
                  │   Express Backend   │
                  │       Render        │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │    MongoDB Atlas    │
                  └─────────────────────┘
