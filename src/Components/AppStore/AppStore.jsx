import React from 'react'
import pattern from "../../assets/pattern.jpg"

const bannerImg={
    backgroundImage:`url(${pattern})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    backgroundPosition:"center",
    height:"100%",
    width:"90%",
};
const AppStore = () => {
  return (
    <div 
    className="container pb-14">
      <div className="text-black py-10 sm:min-h-[400px] sm:grid sm:place-items-center rounded-xl"
      style={bannerImg}>
       <div>
        <div className="space-y-6 max-w-xl mx-auto">
          <h1 data-aos="fade-up" 
           className="text-2xl text-center sm:text-4xl font-semibold font-serif">Get Started With Us</h1>
          <p data-aos="fade-up" 
           className="text-center sm:px-44"> Book your ride with ease and flexibility. Explore a wide range of premium cars, manage your bookings, and enjoy a seamless rental experience tailored just for you.</p>
        </div>
       </div>
      </div>
    </div>
  )
};
export default AppStore;
