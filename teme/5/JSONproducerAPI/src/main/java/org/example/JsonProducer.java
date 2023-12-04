package org.example;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.connect.json.JsonSerializer;

import java.util.Properties;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class JsonProducer {
    public static void main(String[] args) {
        // Set the properties for the producer
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.connect.json.JsonSerializer");

        // Create the producer
        KafkaProducer<String, ObjectNode> producer = new KafkaProducer<>(props);

        // Create a JSON object
        ObjectNode event = JsonNodeFactory.instance.objectNode();
        event.put("name", "John Doe");
        event.put("age", 30);
        event.put("city", "New York");

        // Send a JSON message
        String topic = "JsonEvent";
        producer.send(new ProducerRecord<>(topic, event));

        // Close the producer
        producer.close();
    }
}