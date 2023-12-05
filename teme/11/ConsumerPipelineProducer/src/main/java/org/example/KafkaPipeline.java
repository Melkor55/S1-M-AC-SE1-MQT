package org.example;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import io.confluent.kafka.serializers.KafkaAvroDeserializer;
import io.confluent.kafka.serializers.KafkaAvroSerializer;
import org.apache.avro.generic.GenericRecord;

import java.time.Duration;
import java.util.Collections;
import java.util.Properties;

public class KafkaPipeline {
    public static void main(String[] args) {
        // Define the Kafka properties for the consumer
        Properties consumerProps = new Properties();
        consumerProps.put("bootstrap.servers", "localhost:9092");
        consumerProps.put("group.id", "test5");
        consumerProps.put("key.deserializer", StringDeserializer.class.getName());
        consumerProps.put("value.deserializer", KafkaAvroDeserializer.class.getName());
        consumerProps.put("schema.registry.url", "http://localhost:8081");
        consumerProps.put("specific.avro.reader", "false");
        consumerProps.put("auto.offset.reset", "earliest");  // Start reading from the beginning of the topic

        // Create the consumer
        KafkaConsumer<String, GenericRecord> consumer = new KafkaConsumer<>(consumerProps);

        // Subscribe to the input topic
//        consumer.subscribe(Collections.singletonList("KafkaPipelineIn"));
        consumer.subscribe(Collections.singletonList("SchemaTopic"));

        // Define the Kafka properties for the producer
        Properties producerProps = new Properties();
        producerProps.put("bootstrap.servers", "localhost:9092");
        producerProps.put("key.serializer", StringSerializer.class.getName());
        producerProps.put("value.serializer", KafkaAvroSerializer.class.getName());
        producerProps.put("schema.registry.url", "http://localhost:8081");

        // Create the producer
        KafkaProducer<String, GenericRecord> producer = new KafkaProducer<>(producerProps);

        // Poll for new data and send it to the output topic
        while (true) {
            ConsumerRecords<String, GenericRecord> records = consumer.poll(Duration.ofMillis(100));
            for (ConsumerRecord<String, GenericRecord> record : records) {
                ProducerRecord<String, GenericRecord> producerRecord = new ProducerRecord<>("KafkaPipelineOut", record.value());
                producer.send(producerRecord);
            }
        }
    }
}
