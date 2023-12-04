package org.example;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.connect.json.JsonDeserializer;

import java.time.Duration;
import java.util.Collections;
import java.util.Properties;
import com.fasterxml.jackson.databind.JsonNode;

public class JsonConsumer {
    public static void main(String[] args) {
        // Set the properties for the consumer
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("group.id", "test2");
        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.connect.json.JsonDeserializer");
        props.put("auto.offset.reset", "earliest");  // Start reading from the beginning of the topic

        // Create the consumer
        KafkaConsumer<String, JsonNode> consumer = new KafkaConsumer<>(props);

        // Subscribe to the topic
        String topic = "JsonEvent";
        consumer.subscribe(Collections.singletonList(topic));

        // Poll for new data
        while (true) {
            ConsumerRecords<String, JsonNode> records = consumer.poll(Duration.ofMillis(100));
            for (ConsumerRecord<String, JsonNode> record : records) {
                System.out.printf("Received message: (%s, %s) at offset %d%n",
                        record.key(), record.value().toString(), record.offset());
                        // Va returna eroare daca au fost transmise mesaje non JSON inainte, pe topicul ales
            }
        }
    }
}
