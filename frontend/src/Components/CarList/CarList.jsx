import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios.get("/api/cars")
      .then((res) => {
        console.log("API response:", res.data); // ✅ Check in console
        if (Array.isArray(res.data)) {
          setCars(res.data);
        } else {
          console.error("Expected array, got:", res.data);
          setCars([]); // fallback to empty
        }
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setCars([]);
      });
  }, []);

  const filteredCars = cars
    ?.filter((car) =>
      car.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

  const getImageSrc = (image) => {
    if (!image) return "/images/default-car.jpg";
    return image.startsWith("http") ? image : `/images/${image}`;
  };

  return (
    <div id="cars" className="bg-white dark:bg-dark dark:text-white min-h-screen py-10">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            className="border px-4 py-2 rounded w-full sm:w-1/2 dark:bg-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border px-4 py-2 rounded w-full sm:w-1/3 dark:bg-gray-700 dark:text-white"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCars?.map((car, index) => (
            <div
              key={car.id || index}
              className="border rounded p-4 text-center bg-white dark:bg-gray-800 dark:border-gray-600 shadow"
            >
              <img
                src={getImageSrc(car.image)}
                alt={car.name}
                className="w-full h-40 object-cover mb-2 rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/default-car.jpg";
                }}
              />
              <h3 className="font-bold text-lg">{car.name}</h3>
              <p className="mb-3">₹{car.price}/day</p>
              <Link to={`/book/${car.id}`}>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded transition">
                  Book Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarList;
