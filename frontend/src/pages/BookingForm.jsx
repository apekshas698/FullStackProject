import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

const BookingForm = () => {
  const { id: carId } = useParams(); // Get carId from URL
  const [bookedDates, setBookedDates] = useState([]);
  const [passengerName, setPassengerName] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]);
  const [pricePerDay, setPricePerDay] = useState(0);
  const [carName, setCarName] = useState("");

  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (carId) {
      axios.get(`/api/bookings/car/${carId}/booked-dates`).then((res) => {
        setBookedDates(res.data.map((dateStr) => new Date(dateStr)));
      });

      axios.get(`/api/cars/${carId}`).then((res) => {
        setPricePerDay(res.data.price);
        setCarName(res.data.name);
      });
    }
  }, [carId]);

  const isBooked = (date) =>
    bookedDates.some(
      (bookedDate) =>
        bookedDate.toDateString() === date.toDateString()
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) return alert("Select a valid date range");

    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const ridePrice = days * pricePerDay;

    const bookingData = {
      userId: "testUser", // replace with real userId if using auth
      carId,
      carName,
      passengerName,
      numberOfPassengers: passengers,
      pickupLocation,
      dropLocation,
      ridePrice,
      pickupDate: startDate,
      dropoffDate: endDate,
    };

    try {
      await axios.post("/api/bookings", bookingData);
      alert("Booking Successful!");
    } catch (err) {
      alert("Booking Failed!");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-xl mx-auto my-10 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4">Book {carName}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Passenger Name"
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded dark:bg-gray-900 dark:text-white"
        />

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Pickup Location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded dark:bg-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Drop Location"
            value={dropLocation}
            onChange={(e) => setDropLocation(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded dark:bg-gray-900 dark:text-white"
          />
        </div>

        <input
          type="number"
          min={1}
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          className="w-full px-4 py-2 border rounded dark:bg-gray-900 dark:text-white"
        />

        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => setDateRange(update)}
          minDate={new Date()}
          excludeDates={bookedDates}
          inline
        />

        {startDate && endDate && (
          <p className="text-green-500 font-medium">
            Total Price: ₹{pricePerDay} x {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1} = ₹
            {pricePerDay * (Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1)}
          </p>
        )}

        <button
          type="submit"
          className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
