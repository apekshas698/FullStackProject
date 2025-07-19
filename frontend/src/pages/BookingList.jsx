import React, { useEffect, useState } from "react";
import axios from "../utils/axios";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("/api/bookings");
        if (Array.isArray(res.data)) {
          setBookings(res.data);
        } else {
          console.error("Unexpected response format", res.data);
        }
      } catch (err) {
        console.error("Error fetching bookings", err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">Bookings</h2>
      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        <table className="min-w-full border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr className="text-left">
              <th className="border px-4 py-2">Passenger Name</th>
              <th className="border px-4 py-2">Car Name</th>
              <th className="border px-4 py-2">Pickup Location</th>
              <th className="border px-4 py-2">Drop Location</th>
              <th className="border px-4 py-2">Pickup Date</th>
              <th className="border px-4 py-2">Dropoff Date</th>
              <th className="border px-4 py-2">Passengers</th>
              <th className="border px-4 py-2">Price (₹)</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-4 text-gray-500 dark:text-gray-400">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="border px-4 py-2">{booking.passengerName}</td>
                  <td className="border px-4 py-2">{booking.carName}</td>
                  <td className="border px-4 py-2">{booking.pickupLocation}</td>
                  <td className="border px-4 py-2">{booking.dropLocation}</td>
                  <td className="border px-4 py-2">
                    {new Date(booking.pickupDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(booking.dropoffDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{booking.numberOfPassengers}</td>
                  <td className="border px-4 py-2">₹{booking.ridePrice}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
