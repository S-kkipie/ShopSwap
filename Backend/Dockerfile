FROM openjdk:22-jdk-slim
ARG JAR_FILE=target/ShopSwap-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8443
ENTRYPOINT ["java","-jar","/app.jar"]