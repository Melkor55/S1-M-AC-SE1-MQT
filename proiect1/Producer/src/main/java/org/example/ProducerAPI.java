package org.example;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;

public class ProducerAPI {
    private KafkaProducer<String, String> producer;

    public ProducerAPI() {
        // Define the Kafka properties
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("key.serializer", StringSerializer.class.getName());
        props.put("value.serializer", StringSerializer.class.getName());

        // Create the producer
        this.producer = new KafkaProducer<>(props);
    }

    public void produceMessage(String value) {
        // Send records to the first topic
        ProducerRecord<String, String> record1 = new ProducerRecord<>("kstream-topic1", value);
        producer.send(record1);
    }

    public void close() {
        producer.close();
    }
}