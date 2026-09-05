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


📁 Project Structure
instant-mechanic-dashboard/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── seed/
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md


⚙️ Local Setup
1. Clone the repository
git clone https://github.com/AmaanAli7/instant-mechanic-dashboard.git

cd instant-mechanic-dashboard
2. Backend setup
cd backend
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173

Start the backend:

npm run dev

Backend will run on:

http://localhost:5000

Swagger documentation:

http://localhost:5000/api-docs
3. Frontend setup

Open another terminal:

cd frontend
npm install

Create a .env file:

VITE_API_URL=http://localhost:5000

Start the frontend:

npm run dev

The application will run on the Vite development URL shown in the terminal.

🔐 Environment Variables
Backend
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=your_frontend_url
Frontend
VITE_API_URL=your_backend_url

Never commit .env files or API keys to the repository.

📡 API Documentation

The backend provides Swagger/OpenAPI documentation for the available REST APIs.

Production documentation:

https://instant-mechanic-dashboard-6p91.onrender.com/api-docs

Main API areas include:

Dashboard
Bookings
Mechanics
Customers
Analytics
🔄 Real-Time Events
Booking Created
booking:created

Triggered when a new booking is successfully created.

Booking Status Updated
booking:status-updated

Triggered when a booking status changes.

Supported booking statuses:

pending
assigned
on_the_way
in_progress
completed
cancelled
📱 Responsive Design

The dashboard is designed to work across:

Desktop
Laptop
Tablet
Mobile devices

Responsive layouts are implemented using Tailwind CSS.

🧪 Testing

Production functionality was verified for:

REST API communication
MongoDB persistence
Booking creation
Booking status updates
Socket.IO connection
Real-time dashboard updates
Live KPI updates
Live activity updates
Search and filtering
Responsive layouts
Analytics rendering


🔮 Future Improvements

Potential improvements include:

Authentication and role-based access
Advanced booking assignment workflow
Mechanic location tracking
Real-time map integration
Push notifications
Advanced analytics filters
Export reports
Automated testing
CI/CD pipeline
Performance optimization


👨‍💻 Author

Amaan Ali Khaan

B.Tech — Computer Science Engineering

Full Stack / MERN Developer

📄 License

This project was developed as a full-stack vehicle service operations dashboard project.


### Now run these commands from the repository root

```powershell
git add README.md
git commit -m "Add professional project documentation"
git push
