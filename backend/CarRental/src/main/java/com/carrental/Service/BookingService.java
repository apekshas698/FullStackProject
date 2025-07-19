package com.carrental.Service;

import com.carrental.Model.Booking;
import com.carrental.Repo.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepo bookingRepository;

    @Autowired
    public BookingService(BookingRepo bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // ✅ Create a new booking with car name
    public Booking createBooking(String userId, String carId, String carName, String passengerName,
                                 int numberOfPassengers, String pickupLocation,
                                 String dropLocation, double ridePrice) {

        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setCarId(carId);
        booking.setCarName(carName);
        booking.setBookingDate(LocalDate.now().toString());
        booking.setPassengerName(passengerName);
        booking.setNumberOfPassengers(numberOfPassengers);
        booking.setPickupLocation(pickupLocation);
        booking.setDropLocation(dropLocation);
        booking.setRidePrice(ridePrice);

        // ❗️ Make sure pickupDate and dropoffDate are also set for calendar
        booking.setPickupDate(LocalDate.now());             // Default: now
        booking.setDropoffDate(LocalDate.now().plusDays(1)); // Default: next day

        return bookingRepository.save(booking);
    }

    // ✅ Get all bookings (admin panel or user view)
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // ✅ Get bookings by car ID (for availability calendar)
    public List<Booking> getBookingsByCarId(String carId) {
        return bookingRepository.findByCarId(carId);
    }
}
