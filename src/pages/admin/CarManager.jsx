// src/pages/admin/CarManager.jsx
import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";

const CarManager = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [newCar, setNewCar] = useState({ name: "", price: "", image: "" });
  const [editCarId, setEditCarId] = useState(null);
  const [editCarData, setEditCarData] = useState({ name: "", price: "", image: "" });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    axios.get("/api/cars").then((res) => setCars(res.data));
  };

  const handleAddCar = () => {
    if (!newCar.name || !newCar.price || !newCar.image) return;
    axios.post("/api/cars", { ...newCar, available: true }).then(() => {
      setNewCar({ name: "", price: "", image: "" });
      fetchCars();
    });
  };

  const handleDelete = (id) => axios.delete(`/api/cars/${id}`).then(fetchCars);

  const handleEditClick = (car) => {
    setEditCarId(car.id);
    setEditCarData({ name: car.name, price: car.price, image: car.image });
  };

  const handleEditSave = () => {
    axios.put(`/api/cars/${editCarId}`, editCarData).then(() => {
      setEditCarId(null);
      fetchCars();
    });
  };

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-gray-900 dark:text-white">
      <h2 className="text-xl font-semibold mb-4">Manage Cars</h2>

      <input
        type="text"
        placeholder="Search by name"
        className="w-full mb-4 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredCars.map((car) => (
        <div
          key={car.id}
          className="flex flex-col sm:flex-row justify-between items-center border p-3 rounded mb-2 border-gray-300 dark:border-gray-600"
        >
          {editCarId === car.id ? (
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <input
                value={editCarData.name}
                onChange={(e) => setEditCarData({ ...editCarData, name: e.target.value })}
                className="px-2 py-1 rounded border dark:bg-gray-700 dark:text-white"
              />
              <input
                type="number"
                value={editCarData.price}
                onChange={(e) => setEditCarData({ ...editCarData, price: e.target.value })}
                className="px-2 py-1 rounded border dark:bg-gray-700 dark:text-white"
              />
              <input
                value={editCarData.image}
                onChange={(e) => setEditCarData({ ...editCarData, image: e.target.value })}
                className="px-2 py-1 rounded border dark:bg-gray-700 dark:text-white"
              />
              <button onClick={handleEditSave} className="text-green-600">Save</button>
            </div>
          ) : (
            <span>{car.name} - ₹{car.price}</span>
          )}

          <div className="flex gap-2">
            {editCarId === car.id ? null : (
              <>
                <button onClick={() => handleEditClick(car)} className="text-blue-500">Edit</button>
                <button onClick={() => handleDelete(car.id)} className="text-red-500">Delete</button>
              </>
            )}
          </div>
        </div>
      ))}

      <div className="mt-4 space-y-2">
        <input
          placeholder="Car Name"
          value={newCar.name}
          onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <input
          placeholder="Price"
          type="number"
          value={newCar.price}
          onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <input
          placeholder="Image URL"
          value={newCar.image}
          onChange={(e) => setNewCar({ ...newCar, image: e.target.value })}
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleAddCar}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
        >
          Add Car
        </button>
      </div>
    </div>
  );
};

export default CarManager;
