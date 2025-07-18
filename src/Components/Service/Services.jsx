import React from 'react';
import { FaCameraRetro } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { SlNote } from "react-icons/sl";

const skillsData = [
  {
    name: "Best Price Guarantee",
    icon: (
      <FaCameraRetro className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    link: "#",
    description: "We offer competitive and transparent pricing with no hidden charges. Get the best deals on every ride.",
    aosDelay: "0",
  },
  {
    name: "Fast & Safe Bookings",
    icon: (
      <GiNotebook className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    link: "#",
    description: "Quick and secure online booking process with instant confirmation and reliable customer support.",
    aosDelay: "500",
  },
  {
    name: "Experienced Drivers",
    icon: (
      <SlNote className="text-5xl text-primary group-hover:text-black duration-500" />
    ),
    link: "#",
    description: "Our professional and trained drivers ensure a smooth, comfortable, and safe travel experience every time.",
    aosDelay: "1000",
  },
];

const Services = () => {
  return (
    <div className="py-14 dark:bg-black dark:text-white sm:min-h-[600px] sm:grid sm:place-items-center">
      <div className="container">
        <div className="pb-12">
          <h1 className="text-3xl font-semibold text-center font-serif sm:text-4xl">
            Why Choose Us
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {skillsData.map((skills) => (
            <div
              key={skills.name}
              data-aos="fade-up"
              data-aos-delay={skills.aosDelay}
              className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark hover:bg-primary duration-300 text-white hover:text-black rounded-lg"
            >
              <div className="grid place-items-center">
                {skills.icon}
              </div>
              <h1 className="text-xl font-semibold">{skills.name}</h1>
              <p>{skills.description}</p>
              <a href={skills.link} className="underline hover:text-white">Learn More</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
