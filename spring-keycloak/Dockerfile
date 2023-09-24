FROM openjdk:11
ARG JAR_FILE=./target/authDemo-*.jar
COPY ${JAR_FILE} authDemo.jar
CMD ["java","-jar","authDemo.jar"]
EXPOSE 5000