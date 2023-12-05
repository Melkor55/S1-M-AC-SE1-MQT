CLUSTER_ID="$(curl --silent -X GET http://localhost:8082/v3/clusters/ | grep -Po '"cluster_id":.*?[^\\]",' | awk -F'"' '{print $4}')"

echo $CLUSTER_ID
