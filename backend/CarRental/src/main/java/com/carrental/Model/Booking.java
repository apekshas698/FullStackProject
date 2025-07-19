package com.carrental.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "bookings")
public class Booking {
    @Id
    private String id;

    private String userId;
    private String carId;
    private String bookingDate;

    // 🆕 New fields for booking form
    private String passengerName;
    private int numberOfPassengers;
    private String pickupLocation;
    private String dropLocation;
    private double ridePrice;
    private String carName;  // <-- Add this line
    private LocalDate pickupDate;
    private LocalDate dropoffDate;

}
