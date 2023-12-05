package org.example;

import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.kstream.KStream;

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

        // Create a stream for the first topic
        KStream<String, String> stream1 = builder.stream("kstream-topic1");

        // Create a stream for the second topic
        KStream<String, String> stream2 = builder.stream("kstream-topic2");

        // Merge the two streams
        KStream<String, String> merged = stream1.merge(stream2);

        // Write the merged stream to the output topic
        merged.to("kstream-merged-topic");

        // Create and start the Kafka Streams application
        KafkaStreams streams = new KafkaStreams(builder.build(), props);
        streams.start();
    }
}