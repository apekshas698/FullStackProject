import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";

const BookingManager = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/api/bookings").then((res) => setBookings(res.data));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Manage Bookings</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Passenger</th>
            <th>Car</th>
            <th>Date</th>
            <th>Pickup</th>
            <th>Drop</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.passengerName}</td>
              <td>{booking.carName}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.pickupLocation}</td>
              <td>{booking.dropLocation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManager;