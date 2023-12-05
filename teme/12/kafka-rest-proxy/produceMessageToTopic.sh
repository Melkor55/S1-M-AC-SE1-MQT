NEW_TOPIC_NAME=$1

# Produce a message using JSON with the value '{ "foo": "bar" }' to the topic jsontest
curl -X POST -H "Content-Type: application/vnd.kafka.json.v2+json" \
      --data '{"records":[{"value":{"foo":"bar"}}]}' \
      "http://localhost:8082/topics/$NEW_TOPIC_NAME"
