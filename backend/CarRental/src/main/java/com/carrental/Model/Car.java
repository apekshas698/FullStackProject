package com.carrental.Model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "cars")
public class Car {
    @Id
    private String id;
    private String name;
    private double price;
    private boolean available;
    private String image;

    public Car(String name, double price, boolean available, String image) {
        this.name = name;
        this.price = price;
        this.available = available;
        this.image = image;
    }
}
