FROM openjdk:17
WORKDIR /app
COPY . .
RUN chmod +x mvnw && ./mvnw clean install
CMD ["java", "-jar", "target/CarRental-0.0.1-SNAPSHOT.jar"]
