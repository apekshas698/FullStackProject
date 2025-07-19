package com.carrental.Repo;

import com.carrental.Model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BookingRepo extends MongoRepository<Booking, String> {

    // ✅ Get all bookings for a specific car
    List<Booking> findByCarId(String carId);
}
