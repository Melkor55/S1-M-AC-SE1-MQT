CONSUMER_GROUP_ID=$1
CONSUMER_ID=$2
NEW_TOPIC_NAME=$3

# Subscribe the consumer to the topic
curl -X POST -H "Content-Type: application/vnd.kafka.v2+json" \
      --data "{\"topics\":[\"$NEW_TOPIC_NAME\"]}" \
      http://localhost:8082/consumers/$CONSUMER_GROUP_ID/instances/$CONSUMER_ID/subscription