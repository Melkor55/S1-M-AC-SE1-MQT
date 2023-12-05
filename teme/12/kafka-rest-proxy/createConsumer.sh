CONSUMER_GROUP_ID=$1
CONSUMER_ID=$2

# Create a consumer instance
curl -X POST -H "Content-Type: application/vnd.kafka.v2+json" \
      --data "{\"name\": \"$CONSUMER_ID\",\"format\": \"json\",\"auto.offset.reset\": \"earliest\"}" \
      http://localhost:8082/consumers/$CONSUMER_GROUP_ID