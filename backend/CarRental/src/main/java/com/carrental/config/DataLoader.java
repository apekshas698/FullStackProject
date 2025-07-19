package com.carrental.config;

import com.carrental.Model.Car;
import com.carrental.Model.User;
import com.carrental.Repo.CarRepo;
import com.carrental.Repo.UserRepo;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final CarRepo carRepository;

    @Autowired
    public DataLoader(CarRepo carRepository) {
        this.carRepository = carRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (carRepository.count() == 0) {
            carRepository.save(new Car("Toyota Innova", 4500, true, "https://source.unsplash.com/600x400/?toyota,innova"));
            carRepository.save(new Car("Creta", 4000, true, "https://source.unsplash.com/600x400/?creta,car"));
            carRepository.save(new Car("Toyota Fortuner", 6200, true, "https://source.unsplash.com/600x400/?fortuner,toyota"));
            carRepository.save(new Car("BMW", 8000, true, "https://source.unsplash.com/600x400/?bmw,luxurycar"));
            carRepository.save(new Car("XUV 700", 5000, true, "https://source.unsplash.com/600x400/?xuv700,mahindra"));
            carRepository.save(new Car("Swift", 3000, true, "https://source.unsplash.com/600x400/?swift,maruti"));
            carRepository.save(new Car("Hyundai Verna", 4200, true, "https://source.unsplash.com/600x400/?verna,hyundai"));

            System.out.println("🚗 Sample cars inserted into MongoDB");
        }
    }

    @Autowired
    private UserRepo userRepository;

    @PostConstruct
    public void init() {
        if (userRepository.count() == 0) {
            User user = new User(null, "user1@example.com", "123456", "USER");
            userRepository.save(user);
            System.out.println("✅ Test user added to MongoDB");
        }
    }
}
