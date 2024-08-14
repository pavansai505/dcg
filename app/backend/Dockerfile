# Use an official Java runtime as a parent image
FROM openjdk:21-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the Spring Boot JAR file into the container
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
