# Use an official Java runtime as a parent image
FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Spring Boot JAR file into the container
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Copy the keystore file into the container
COPY src/main/resources/ssl/keystore.p12 /app/keystore.p12

# Expose the necessary port (e.g., 8443 for HTTPS)
EXPOSE 8443

# Run the JAR file with the active Spring profile set to prod
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
