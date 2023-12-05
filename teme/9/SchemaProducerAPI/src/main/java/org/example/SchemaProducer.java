package org.example;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.avro.Schema;
import org.apache.avro.generic.GenericData;
import org.apache.avro.generic.GenericRecord;

import java.io.File;
import java.io.IOException;
import java.util.Properties;

public class SchemaProducer {
    public static void main(String[] args) {
        // Read the Avro schema file
        Schema.Parser parser = new Schema.Parser();
        Schema schema = null;
        try {
            schema = parser.parse(new File("src/main/java/org/example/user_schema.json"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        if (schema == null) {
            System.out.println("Schema is null. Please check your schema file.");
            System.exit(1);  // Exit the program if the schema is null
        }

        // Set the properties for the producer
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "io.confluent.kafka.serializers.KafkaAvroSerializer");
        props.put("schema.registry.url", "http://localhost:8081");

        // Create the producer
        KafkaProducer<String, GenericRecord> producer = new KafkaProducer<>(props);

        // Create a message
        GenericRecord user = new GenericData.Record(schema);
        user.put("name", "Ion Zapada");
        user.put("age", 50);

        // Send the message
        String topic = "SchemaTopic";
        producer.send(new ProducerRecord<>(topic, user));

        // Close the producer
        producer.close();
    }
}