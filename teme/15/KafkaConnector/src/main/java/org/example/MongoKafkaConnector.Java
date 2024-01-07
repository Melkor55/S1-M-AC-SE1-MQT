package org.example;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

import java.util.Properties;

public class MongoKafkaConnector {

    public static void main(String[] args) {

        // Create a MongoDB client
        MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
        
        // Get the database and collection
        // Note: `collection` is the name for a no-sql table and `document` is the name for entry 
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> collection = database.getCollection("test-Collection");

        // Create a Kafka producer
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        KafkaProducer<String, String> producer = new KafkaProducer<>(props);

        // Iterate over the MongoDB collection and send each document to Kafka
        for (Document doc : collection.find()) {
            producer.send(new ProducerRecord<String, String>("MongoKafkaConnector-topic", doc.toJson()));
        }

        // Close the producer and MongoDB client
        producer.close();
        mongoClient.close();
    }
}
