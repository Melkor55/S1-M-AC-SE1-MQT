# Start with a base image containing Java runtime
FROM openjdk:8-jdk-alpine

# The application's .jar file
ARG JAR_FILE=target/my-application.jar

# Add the application's .jar to the container
ADD ${JAR_FILE} my-application.jar

# Run the jar file 
ENTRYPOINT ["java","-jar","/my-application.jar"]