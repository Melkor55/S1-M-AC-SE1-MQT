CLUSTER_ID=$1
NEW_TOPIC_NAME=$2

# Check if topic exists
TOPIC_LIST="$( curl --silent -X GET http://localhost:8082/v3/clusters/$CLUSTER_ID/topics)"
# echo $TOPIC_LIST

if grep -q "\"topic_name\": \?\"$NEW_TOPIC_NAME\"" <<<$TOPIC_LIST
then
    echo "Topic '$NEW_TOPIC_NAME' already exists"
else
    echo "Creating '$NEW_TOPIC_NAME' topic"
    # Create new topic
    curl -X POST -H "Content-Type: application/json" \
        --data "{\"topic_name\": \"$NEW_TOPIC_NAME\"}" \
        http://localhost:8082/v3/clusters/$CLUSTER_ID/topics
fi