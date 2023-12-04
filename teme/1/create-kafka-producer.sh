Mesaj="mesaj_default"

docker exec \
    -it teme-kafka-1 \
    sh -c "/usr/bin/kafka-console-producer \
                <<<$Mesaj \
                --broker-list localhost:9092 \
                --topic tema1" 
