package org.example;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;

import java.util.Properties;

public class CustomEventProducer {
    public static void main(String[] args) {
        // Set the properties for the producer
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.example.CustomEventSerializer");

        // Create the producer
        KafkaProducer<String, CustomEvent> producer = new KafkaProducer<>(props);

        // Create a custom event
        CustomEvent event = new CustomEvent();
        event.setName("John Doe");
        event.setAge(30);

        // Send the custom event
        String topic = "CustomEvent";
        producer.send(new ProducerRecord<>(topic, event));

        // Close the producer
        producer.close();
    }
}
