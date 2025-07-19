package com.carrental.Controller;

import com.carrental.Model.Car;
import com.carrental.Service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:3000")
public class CarController {

    private final CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    // Get all cars
    @GetMapping
    public List<Car> getCars() {
        return carService.getAllCars();
    }

    // ✅ Get car by ID (NEW)
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable String id) {
        Optional<Car> car = carService.getCarById(id);
        return car.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add a new car
    @PostMapping
    public Car addCar(@RequestBody Car car) {
        return carService.saveCar(car);
    }

    // Update car
    @PutMapping("/{id}")
    public Car updateCar(@PathVariable String id, @RequestBody Car updatedCar) {
        return carService.updateCar(id, updatedCar);
    }

    // Delete car
    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable String id) {
        carService.deleteCar(id);
    }
}
