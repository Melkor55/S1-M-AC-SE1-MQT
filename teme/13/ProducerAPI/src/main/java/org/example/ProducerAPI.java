package org.example;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;

public class ProducerAPI {
    public static void main(String[] args) {
        // Define the Kafka properties
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("key.serializer", StringSerializer.class.getName());
        props.put("value.serializer", StringSerializer.class.getName());

        // Create the producer
        KafkaProducer<String, String> producer = new KafkaProducer<>(props);

        // Send records to the first topic
        ProducerRecord<String, String> record1 = new ProducerRecord<>("kstream-topic1", "kstream-value1");
        producer.send(record1);

        // Send records to the second topic
        ProducerRecord<String, String> record2 = new ProducerRecord<>("kstream-topic2", "kstream-value2");
        producer.send(record2);

        // Close the producer
        producer.close();
    }
}