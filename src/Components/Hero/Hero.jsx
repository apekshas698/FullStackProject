import React from "react";
import carPng from "../../assets/car.jpg";
import yellowCarPng from "../../assets/Yellowcar.jpg"

const Hero = ({theme}) => {
  return (
    <div className="dark:bg-black dark:text-white duration-300  relative-z-20">
      <div className="container min-h-[100px]">
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2">
          <div 
          data-aos="zoom-in"
          data-aos-duration="1500"
          className="order-1 sm:order-2">
            <img
              src={theme==="dark"?carPng:yellowCarPng}
              alt=""
            />
          </div>
          <div>
            <p 
            data-aos="fade-up"
             className="text-primary text-2xl font-serif pb-4">Effortless</p>
            <h1 
            data-aos="fade-up"
            data-aos-delay="600"
            className="text-3xl lg:text-5xl font-semibold font-serif pb-4 ">Car Rental</h1>
            <p
            data-aos="fade-up"
            data-aos-delay="1000"
            className="pb-4"
            >
             Find and book the perfect car for your journey in just a few clicks. Affordable prices, flexible bookings, and a wide range of cars to suit every trip.
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;