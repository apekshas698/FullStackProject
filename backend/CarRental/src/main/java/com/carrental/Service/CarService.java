package com.carrental.Service;
import com.carrental.Model.Car;
import com.carrental.Repo.CarRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {
    private final CarRepo carRepository;

    @Autowired
    public CarService(CarRepo carRepository) {
        this.carRepository = carRepository;
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }
    // service/CarService.java
    public Car saveCar(Car car) {
        return carRepository.save(car);
    }
    public Car updateCar(String id, Car updatedCar) {
        Car existingCar = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found with id: " + id));

        existingCar.setName(updatedCar.getName());
        existingCar.setPrice(updatedCar.getPrice());
        existingCar.setAvailable(updatedCar.isAvailable());

        return carRepository.save(existingCar);
    }

    public void deleteCar(String id) {
        if (!carRepository.existsById(id)) {
            throw new RuntimeException("Car not found with id: " + id);
        }
        carRepository.deleteById(id);
    }
    public Optional<Car> getCarById(String id) {
        return carRepository.findById(id);
    }


}
