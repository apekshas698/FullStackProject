# 🚗 FullStack Car Rental Project

A complete Full Stack Car Rental web application built using **Spring Boot**, **MongoDB**, and **React**. This application enables users to browse, book, and manage rental cars, while also providing an admin panel for vehicle and booking management.

## 🔧 Tech Stack

### Backend (Java - Spring Boot)
- Spring Boot
- Spring Security with JWT Authentication
- MongoDB Atlas (Cloud NoSQL DB)
- RESTful API with CRUD operations

### Frontend (React)
- React JS (Vite)
- Redux for State Management
- Axios for API calls
- React Router
- Tailwind CSS 

### Deployment
- **Frontend**: Deployed via **Netlify**
- **Backend**: Hosted using **Render**
- GitHub for version control and collaboration

---

## ✨ Features

### 👤 User Features
- Browse available cars with image, location, and price
- Filter by category, sort by price
- Book a car (select location, date, time, passengers)
- View booked cars and booking details
- Login/Register functionality
- JWT-based session management

### 🔐 Admin Features
- Admin login
- Dashboard with total bookings, active users, car availability, and revenue stats
- Add, update, and delete cars
- View all bookings
- Manage user access roles

---

## 📂 Project Structure

```
FullStackProject/
├── backend/         # Spring Boot application
│   ├── src/
│   ├── pom.xml
│   └── application.properties
├── frontend/        # React application (Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
```

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/apekshas698/FullStackProject.git
cd FullStackProject
```

### Setup Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Update MongoDB URI in `application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster0.mongodb.net/car_rental
   jwt.secret=yourSecretKey
   ```

3. Run the backend:
   ```bash
   mvn spring-boot:run
   ```

### Setup Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

---

## 🌐 Live Demo

- **Frontend**: [Netlify App](https://joyful-starburst-300df3.netlify.app/)
- **Backend**: [Render Backend](https://car-rental-backend-81ma.onrender.com)

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋‍♀️ Author

**Apeksha Shukla**  
- GitHub: [@apekshas698](https://github.com/apekshas698)  
- Portfolio: *Coming Soon*

---

## 📢 Contributions

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
