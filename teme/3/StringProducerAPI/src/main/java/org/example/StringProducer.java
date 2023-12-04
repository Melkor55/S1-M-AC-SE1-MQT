package org.example;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;

import java.util.Properties;

public class StringProducer {
    public static void main(String[] args) {
        // Set the properties for the producer
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        // Create the producer
        KafkaProducer<String, String> producer = new KafkaProducer<>(props);

        // Send a string message
        String topic = "tema1";
        String message = "javaMessage1";
        producer.send(new ProducerRecord<>(topic, message));

        // Close the producer
        producer.close();
    }
}