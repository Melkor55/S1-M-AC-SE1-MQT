
cd ./kafka-rest-proxy

NEW_TOPIC_NAME="KafkaRestProxy"
CONSUMER_GROUP_ID="rest-consumer-group"
CONSUMER_ID="rest-consumer-2"

echo "Creating topic"
CLUSTER_ID="$(./getClusters.sh)"
./produceMessageToTopic.sh $NEW_TOPIC_NAME
./createTopic.sh $CLUSTER_ID $NEW_TOPIC_NAME
./createConsumer.sh $CONSUMER_GROUP_ID $CONSUMER_ID
./subscribeConsumerToTopic.sh $CONSUMER_GROUP_ID $CONSUMER_ID $NEW_TOPIC_NAME
./fetchRecords.sh $CONSUMER_GROUP_ID $CONSUMER_ID