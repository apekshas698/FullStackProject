package com.carrental.Controller;

import com.carrental.Model.Booking;
import com.carrental.Model.Car;
import com.carrental.Service.BookingService;
import com.carrental.Service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class BookingController {

    private final BookingService bookingService;
    private final CarService carService;

    @Autowired
    public BookingController(BookingService bookingService, CarService carService) {
        this.bookingService = bookingService;
        this.carService = carService;
    }

    // ✅ Create a new booking
    @PostMapping
    public Booking bookCar(@RequestBody Map<String, String> req) {
        String userId = req.get("userId");
        String carId = req.get("carId");
        String passengerName = req.get("passengerName");
        int numberOfPassengers = Integer.parseInt(req.get("numberOfPassengers"));
        String pickupLocation = req.get("pickupLocation");
        String dropLocation = req.get("dropLocation");
        double ridePrice = Double.parseDouble(req.get("ridePrice"));

        Optional<Car> optionalCar = carService.getCarById(carId);
        String carName = optionalCar.map(Car::getName).orElse("Unknown Car");

        return bookingService.createBooking(
                userId, carId, carName, passengerName,
                numberOfPassengers, pickupLocation, dropLocation, ridePrice
        );
    }

    // ✅ Get all bookings
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // ✅ Get booked dates for calendar
    @GetMapping("/car/{carId}/booked-dates")
    public List<LocalDate> getBookedDatesForCar(@PathVariable String carId) {
        List<Booking> bookings = bookingService.getBookingsByCarId(carId);
        List<LocalDate> bookedDates = new ArrayList<>();

        for (Booking booking : bookings) {
            LocalDate start = booking.getPickupDate();
            LocalDate end = booking.getDropoffDate();

            while (!start.isAfter(end)) {
                bookedDates.add(start);
                start = start.plusDays(1);
            }
        }
        return bookedDates;
    }

    // ✅ Total Booking Count
    @GetMapping("/count")
    public Map<String, Integer> getBookingCount() {
        int count = bookingService.getAllBookings().size();
        return Collections.singletonMap("totalBookings", count);
    }

    // ✅ Total Revenue Calculation
    @GetMapping("/total-revenue")
    public Map<String, Double> getTotalRevenue() {
        List<Booking> bookings = bookingService.getAllBookings();
        double totalRevenue = bookings.stream()
                .mapToDouble(Booking::getRidePrice)
                .sum();
        return Collections.singletonMap("totalRevenue", totalRevenue);
    }
}
