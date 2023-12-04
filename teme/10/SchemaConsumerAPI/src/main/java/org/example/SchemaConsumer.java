package org.example;

import org.apache.avro.Schema;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.serialization.StringDeserializer;
import io.confluent.kafka.serializers.KafkaAvroDeserializer;
import org.apache.avro.generic.GenericRecord;

import java.util.Collections;
import java.util.Properties;

public class SchemaConsumer {
    public static void main(String[] args) {
        // Define the Kafka properties
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("group.id", "test4");
        props.put("key.deserializer", StringDeserializer.class.getName());
        props.put("value.deserializer", KafkaAvroDeserializer.class.getName());
        props.put("schema.registry.url", "http://localhost:8081");
        props.put("specific.avro.reader", "false");
        props.put("auto.offset.reset", "earliest");  // Start reading from the beginning of the topic

        // Create the consumer
        KafkaConsumer<String, GenericRecord> consumer = new KafkaConsumer<>(props);

        // Subscribe to the topic
        String topic = "SchemaTopic";
        consumer.subscribe(Collections.singletonList(topic));

        // Poll for new data
        while (true) {
            ConsumerRecords<String, GenericRecord> records = consumer.poll(100);
            for (ConsumerRecord<String, GenericRecord> record : records) {
                Schema schema = record.value().getSchema();
                System.out.println("Schema: " + schema.toString());
                String name = record.value().get("name").toString();
                int age = Integer.parseInt(record.value().get("age").toString());
                System.out.printf("Name: %s, Age: %d%n", name, age);
            }
        }
    }
}
