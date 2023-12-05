CONSUMER_GROUP_ID=$1
CONSUMER_ID=$2


# Fetch the records
curl -X GET -H "Accept: application/vnd.kafka.json.v2+json" \
      http://localhost:8082/consumers/$CONSUMER_GROUP_ID/instances/$CONSUMER_ID/records