# Use OpenJDK 17 base image
FROM openjdk:17

# Set working directory inside the container
WORKDIR /app

# Copy all project files to the container's working directory
COPY . .

# Make Maven wrapper executable and build the project, skipping tests
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Run the Spring Boot application JAR
CMD ["java", "-jar", "target/CarRental-0.0.1-SNAPSHOT.jar"]
