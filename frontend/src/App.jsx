import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';

import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import About from './Components/About/About';
import Services from './Components/Service/Services';
import CarList from './Components/CarList/CarList';
import Testimonial from './Components/Testimonial/Testimonial';
import AppStore from './Components/AppStore/AppStore';
import ContactSection from './Components/ContactSection/ContactSection';
import Footer from './Components/Footer/Footer';

import BookCar from './pages/BookCar';
import BookingList from './pages/BookingList';
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/Login'; // ✅ Make sure this file exists
import ProtectedAdminRoute from './routes/ProtectedAdminRoute'; // ✅ Make sure this file exists

import AOS from 'aos';
import 'aos/dist/aos.css';
import 'react-datepicker/dist/react-datepicker.css';

// ✅ Scroll to section when navigating from internal nav links
const ScrollToSectionWrapper = ({ theme }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      setTimeout(() => {
        scroller.scrollTo(location.state.scrollTo, {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart',
          offset: -80,
        });
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Hero theme={theme} />
      <About />
      <Services />
      <CarList />
      <Testimonial />
      <AppStore />
      <ContactSection />
      <Footer />
    </>
  );
};

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const element = document.documentElement;

  useEffect(() => {
    if (theme === 'dark') {
      element.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      element.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-black dark:text-white">
        <Navbar theme={theme} setTheme={setTheme} />

        <Routes>
          <Route path="/" element={<ScrollToSectionWrapper theme={theme} />} />
          <Route path="/book/:carId" element={<BookCar />} />
          <Route path="/bookings" element={<BookingList />} />
          <Route path="/login" element={<Login />} />

          {/* ✅ Admin route protected by role check */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
