Mesaj="mesaj"

docker exec \
    -it teme-kafka-1 \
    sh -c "/usr/bin/kafka-console-consumer \
                --bootstrap-server localhost:9092 \
                --topic tema1 \
                --from-beginning" 
