package org.example;

import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.Predicate;

import java.util.Properties;

public class StreamsApp {
    public static void main(String[] args) {
        // Define the Kafka Streams configuration
        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "streams-app");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        // Create a StreamsBuilder
        StreamsBuilder builder = new StreamsBuilder();

        // Create a KStream that represents the stream of incoming records
        KStream<String, String> stream = builder.stream("kstream-topic1");

        // Define the predicate function
        Predicate<String, String> predicate = (key, value) -> checkIfProductsInStock(value);

        // Filter the stream based on the predicate
        KStream<String, String> filteredStream = stream.filter(predicate);

        // Write the filtered records to the output topic
        filteredStream.to("kstream-topic2");

        // Create and start the Kafka Streams application
        KafkaStreams streams = new KafkaStreams(builder.build(), props);
        streams.start();
    }

    private static boolean checkIfProductsInStock(String value) {
        // Return true if the value should be kept, false otherwise
        return true;
    }
}