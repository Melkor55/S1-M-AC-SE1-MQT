package org.example;

import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

import java.util.Properties;
import java.util.Collections;

public class KafkaMongoConnector {

    public static void main(String[] args) {

        // Create a MongoDB client
        MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");

        // Get the database and collection
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> collection = database.getCollection("yourCollection");

        // Create a Kafka consumer
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("group.id", "test");
        props.put("enable.auto.commit", "true");
        props.put("auto.commit.interval.ms", "1000");
        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);

        // Subscribe to the Kafka topic
        consumer.subscribe(Collections.singletonList("yourTopic"));

        // Continuously read from the Kafka topic and insert each record into MongoDB
        while (true) {
            ConsumerRecords<String, String> records = consumer.poll(100);
            if(records.isEmpty())
                break;
            for (ConsumerRecord<String, String> record : records) {
                Document doc = Document.parse(record.value());
                collection.insertOne(doc);
            }
        }

        // Close the consumer and MongoDB client
        // Note: This will never be reached in this example because of the infinite loop
        consumer.close();
        mongoClient.close();
    }
}
