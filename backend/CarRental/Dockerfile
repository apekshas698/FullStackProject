# Use OpenJDK 17 as the base image
FROM openjdk:17

# Set the working directory inside the container
WORKDIR /app

# Copy the entire project into the container's /app directory
COPY . .

# Give execute permission to the Maven wrapper and build the project without running tests
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Specify the command to run the JAR file
CMD ["java", "-jar", "target/CarRental-0.0.1-SNAPSHOT.jar"]
