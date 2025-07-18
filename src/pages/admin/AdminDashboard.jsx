import React from 'react';
import CarManager from './CarManager';
import BookingManager from './BookingManager';
import Stats from './Stats';

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="grid gap-8">
        <Stats />
        <CarManager />
        <BookingManager />
      </div>
    </div>
  );
};

export default AdminDashboard;
