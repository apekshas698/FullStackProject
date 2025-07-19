import React from 'react';
import CarPng from "../../assets/carPic.jpg";

const About = () => {
  return (
    <div
      id="about"
      className="dark:bg-dark bg-slate-100 dark:text-white duration-300 
      sm:min-h-[600px] sm:grid sm:place-items-center py-12"
    >
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-8">
          {/* Left Side - Image */}
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={CarPng}
              alt="About Car"
              className="sm:scale-105 sm:-translate-x-11 
              max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6 sm:p-8 text-justify">
            <h1
              data-aos="fade-up"
              className="text-3xl sm:text-4xl font-bold font-serif text-primary"
            >
              About Us
            </h1>
            <p data-aos="fade-up">
              We are passionate about making your travel experience smooth and luxurious.
              With a wide variety of cars and a seamless booking experience, our platform
              is designed for comfort, affordability, and reliability.
            </p>
            <p data-aos="fade-up">
              Whether you're planning a weekend getaway, a business trip, or a city ride,
              our fleet offers options to suit every need — from premium sedans to rugged SUVs.
            </p>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
