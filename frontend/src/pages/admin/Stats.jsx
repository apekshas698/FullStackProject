import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";

const Stats = () => {
  const [stats, setStats] = useState({
    cars: 0,
    bookings: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [carRes, bookingRes, userRes, revenueRes] = await Promise.all([
          axios.get("/api/cars"),
          axios.get("/api/bookings/count"),
          axios.get("/api/users/count"),
          axios.get("/api/bookings/total-revenue"),
        ]);

        setStats({
          cars: carRes.data.length,
          bookings: bookingRes.data.totalBookings,
          users: userRes.data.totalUsers,
          revenue: revenueRes.data.totalRevenue,
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow h-full">
      <h2 className="text-2xl font-bold mb-4">📊 Dashboard Statistics</h2>
      <ul className="space-y-2 text-lg">
        <li>🚗 Total Cars: <strong>{stats.cars}</strong></li>
        <li>📘 Total Bookings: <strong>{stats.bookings}</strong></li>
        <li>👥 Active Users: <strong>{stats.users}</strong></li>
        <li>💰 Total Revenue: <strong>₹{stats.revenue.toFixed(2)}</strong></li>
      </ul>
    </div>
  );
};

export default Stats;
