import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${baseURL?.replace(/\/+$/, "") || ""}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* Dashboard */
export const getDashboardSummary = async () => {
  const response = await api.get("/dashboard/summary");

  return response.data;
};

/* Bookings */
export const getBookings = async (params = {}) => {
  const response = await api.get("/bookings", {
    params,
  });

  return response.data;
};

export const updateBookingStatus = async (id, status) => {
  const response = await api.patch(
    `/bookings/${id}/status`,
    { status }
  );

  return response.data;
};

/* Analytics */
export const getAnalytics = async () => {
  const response = await api.get("/analytics");

  return response.data;
};

/* Mechanics */
export const getMechanics = async () => {
  const response = await api.get("/mechanics");

  return response.data;
};

/* Customers */
export const getCustomers = async () => {
  const response = await api.get("/customers");

  return response.data;
};

export default api;
