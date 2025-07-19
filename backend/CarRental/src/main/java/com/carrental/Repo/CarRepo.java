package com.carrental.Repo;
import com.carrental.Model.Car;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CarRepo extends MongoRepository<Car, String>
{

}
