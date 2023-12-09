let stream =
{ 
    "key": "123",
    "value": "{}",
    "topic": "my-output-topic",
    "partition": 0,
    "partitionKey": null,
    "opaqueKey": null
  }

"use strict";
const {KafkaStreams} = require("kafka-streams");
var config = require('./kafka-config')
const factory = new KafkaStreams(config);

const myProducerStream =
    factory.getKStream()
    .from("   ")
    .mapJSONConvenience()
    .mapWrapKafkaValue()
    .tap(console.log)
    // .wrapAsKafkaValue() //value -> {key, value, ..}
    // .to("output-topic");

myProducerStream.start();


exports.producer = myProducerStream;