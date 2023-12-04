package org.example;

import org.apache.kafka.common.serialization.Deserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

public class CustomEventDeserializer implements Deserializer<CustomEvent> {
    @Override
    public CustomEvent deserialize(String topic, byte[] data) {
        ObjectMapper mapper = new ObjectMapper();
        CustomEvent event = null;
        try {
            event = mapper.readValue(data, CustomEvent.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return event;
    }
}