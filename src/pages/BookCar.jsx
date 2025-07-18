import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookCar = () => {
  const { carId } = useParams();
  const navigate = useNavigate();

  const userId = "6858518dfa80eeef2aad3ab5"; // Replace with real user ID logic

  const [car, setCar] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);
  const [form, setForm] = useState({
    passengerName: '',
    numberOfPassengers: 1,
    pickupLocation: '',
    dropLocation: '',
    ridePrice: '',
  });

  useEffect(() => {
    if (carId) {
      axios.get(`/api/cars/${carId}`)
        .then(res => {
          setCar(res.data);
          setForm(prev => ({ ...prev, ridePrice: res.data.price || '' }));
        })
        .catch(err => console.error("Error fetching car:", err));

      axios.get(`/api/bookings/car/${carId}/booked-dates`)
        .then(res => setBookedDates(res.data.map(date => new Date(date))))
        .catch(err => console.error("Error fetching booked dates:", err));
    }
  }, [carId]);

  useEffect(() => {
    if (car) {
      const basePrice = car.price;
      const passengerMultiplier = form.numberOfPassengers || 1;
      const days = (pickupDate && dropoffDate) ? Math.ceil((dropoffDate - pickupDate) / (1000 * 60 * 60 * 24)) + 1 : 1;
      const totalPrice = basePrice * passengerMultiplier * days;
      setForm(prev => ({ ...prev, ridePrice: totalPrice.toFixed(2) }));
    }
  }, [form.numberOfPassengers, pickupDate, dropoffDate, car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/bookings", {
        userId,
        carId,
        pickupDate,
        dropoffDate,
        ...form,
      });
      alert("✅ Booking successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ Booking failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <form
        onSubmit={handleBooking}
        className="bg-white dark:bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">Book Your Car</h2>

        <div>
          <label className="block mb-1 font-medium dark:text-white">Passenger Name</label>
          <input
            type="text"
            name="passengerName"
            value={form.passengerName}
            onChange={handleChange}
            placeholder="Enter full name"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-black dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium dark:text-white">Number of Passengers</label>
          <input
            type="number"
            name="numberOfPassengers"
            value={form.numberOfPassengers}
            onChange={handleChange}
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-black dark:text-white"
            min={1}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium dark:text-white">Pickup Location</label>
          <input
            type="text"
            name="pickupLocation"
            value={form.pickupLocation}
            onChange={handleChange}
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-black dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium dark:text-white">Drop Location</label>
          <input
            type="text"
            name="dropLocation"
            value={form.dropLocation}
            onChange={handleChange}
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-black dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium dark:text-white">Pickup Date</label>
          <DatePicker
            selected={pickupDate}
            onChange={(date) => setPickupDate(date)}
            excludeDates={bookedDates}
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-black dark:text-white"
            minDate={new Date()}
            placeholderText="Select pickup date"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium dark:text-white">Dropoff Date</label>
          <DatePicker
            selected={dropoffDate}
            onChange={(date) => setDropoffDate(date)}
            excludeDates={bookedDates}
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-black dark:text-white"
            minDate={pickupDate || new Date()}
            placeholderText="Select dropoff date"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium dark:text-white">Ride Price (₹)</label>
          <input
            type="number"
            name="ridePrice"
            value={form.ridePrice}
            readOnly
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-black dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookCar;
