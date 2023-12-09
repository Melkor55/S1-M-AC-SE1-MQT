let topic = "test_topic";

let stream =
{ 
    "key": "123",
    "value": "{}",
    "topic": topic,
    "partition": 0,
    "partitionKey": null,
    "opaqueKey": null
  }

"use strict";
const {KafkaStreams} = require("kafka-streams");
// var config = require('./kafka-config')

let config =
{
    "noptions": {
        // "metadata.broker.list": "localhost:19092",
        "kafkaHost": 'localhost:19092',
        "group.id": "kafka-streams-test-native",
        "client.id": "kafka-streams-test-name-native",
        "event_cb": true,
        "compression.codec": "snappy",
        "api.version.request": true,
        "socket.keepalive.enable": true,
        "socket.blocking.max.ms": 100,
        "enable.auto.commit": false,
        "auto.commit.interval.ms": 100,
        "heartbeat.interval.ms": 250,
        "retry.backoff.ms": 250,
        "fetch.min.bytes": 100,
        "fetch.message.max.bytes": 2 * 1024 * 1024,
        "queued.min.messages": 100,
        "fetch.error.backoff.ms": 100,
        "queued.max.messages.kbytes": 50,
        "fetch.wait.max.ms": 1000,
        "queue.buffering.max.ms": 1000,
        "batch.num.messages": 10000
    },
    "tconf": {
        "auto.offset.reset": "earliest",
        "request.required.acks": 1
    },
    "batchOptions": {
        "batchSize": 5,
        "commitEveryNBatch": 1,
        "concurrency": 1,
        "commitSync": false,
        "noBatchCommits": false
    }
}


const Producer = () => {
    const factory = new KafkaStreams(config);

    // get the KStream from the input topic
    const KStreamProducer = factory.getKStream("test_topic");
    KStreamProducer.forEach(message => console.log(message));
    KStreamProducer.start().then(() => {
        console.log("stream started, as kafka consumer is ready.");
    }, error => {
        console.log("streamed failed to start: " + error);
    });

    console.log("--- Producer started ! ---")

    // apply some transformations to the stream
    KStreamProducer
    // map the value to a JSON object with name property
    .map((value, metadata) => {
        // do something with the value and metadata
        return stream;
    })
    // write the output stream to another topic
    .to("test_topic2");

    console.log("--- Producer ended ! ---")
}
exports.producer = Producer;