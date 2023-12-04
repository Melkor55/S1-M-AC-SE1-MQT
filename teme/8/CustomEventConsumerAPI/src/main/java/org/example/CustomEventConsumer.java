package org.example;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;

import java.time.Duration;
import java.util.Collections;
import java.util.Properties;

public class CustomEventConsumer {
    public static void main(String[] args) {
        // Set the properties for the consumer
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("group.id", "test3");
        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.example.CustomEventDeserializer");
        props.put("auto.offset.reset", "earliest");  // Start reading from the beginning of the topic

        // Create the consumer
        KafkaConsumer<String, CustomEvent> consumer = new KafkaConsumer<>(props);

        // Subscribe to the topic
        String topic = "CustomEvent";
        consumer.subscribe(Collections.singletonList(topic));

        // Poll for new data
        while (true) {
            ConsumerRecords<String, CustomEvent> records = consumer.poll(Duration.ofMillis(100));
            for (ConsumerRecord<String, CustomEvent> record : records) {
                CustomEvent event = record.value();
                System.out.printf("Received event: name=%s, age=%d%n", event.getName(), event.getAge());
            }
        }
    }
}