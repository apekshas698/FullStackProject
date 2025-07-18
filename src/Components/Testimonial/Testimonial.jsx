import React from 'react'
const testimonialData=[
{
  name:"Apeksha",
  image:"",
description:"Booking a car with this platform was incredibly simple and hassle-free. The vehicle was clean, well-maintained, and perfect for my weekend trip. Highly recommended!",
aosDelay:"0",
},
{
  name:"Harshit",
  image:"",
  description:"Great service and a wide range of cars to choose from. I was able to find a car that suited my budget and got instant confirmation. Loved the experience!",
  aosDelay:"300",
},
{
  name:"Vaishnavi",
  image:"",
  description:"I booked a car for a family function and everything went smoothly. Easy booking process, timely pickup, and friendly customer support. Will book again soon!",
  aosDelay:"1000",
},
]
const Testimonial = () => {
  return (
    <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
     <div className="container">
        <div className="space-y-4 pb-12">
            <p className="text-3xl font-semibold text-center sm:text-4xl font-serif">
        What Our Clients Say About Us
            </p>
            <p data-aos="fade-up" className="text-center sm:px-44">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore iure corporis quod assumenda similique.</p>
        </div>
        {/* Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-black dark:text-white">
          {
            testimonialData.map((data) =>{
              return(
                      <div 
                      data-aos="fade-up"
                      data-aos-delay={data.delay}
                      key={data.name}
                      className="card text-center group space-y-3 sm:space-y-6 p-4 bg-gray-100 dark:bg-white/20 sm:py-12
                      duration-300 rounded-lg">
                         <div className="grid place-items-center">
                          <img src="https://picsum.photos/200" alt="" 
                          className="h-20 w-20 rounded-full"/>
                          </div>
                          <div className="text-2xl">
        &#11088;&#11088;&#11088;&#11088;&#11088;</div>
        <p>{data.description}</p>
        <p className="font-bold text-center">{data.name}</p>
          </div>
              );
            })
          }
        </div>
     </div>
    </div>
  )
};
export default Testimonial;
