-- Create a stream for the first topic
CREATE STREAM kSQL_topic1_stream (name VARCHAR, age INT) WITH (KAFKA_TOPIC='kSQL-topic1', VALUE_FORMAT='JSON');

-- Create a stream for the second topic
CREATE STREAM kSQL_topic2_stream (name VARCHAR, age INT) WITH (KAFKA_TOPIC='kSQL-topic1', VALUE_FORMAT='JSON');

-- Perform a SQL query on the two streams
SELECT kSQL_topic1_stream.name, kSQL_topic1_stream.age, kSQL_topic2_stream.name, kSQL_topic2_stream.age
FROM kSQL_topic1_stream
INNER JOIN kSQL_topic2_stream WITHIN 1 HOURS
ON kSQL_topic1_stream.name = kSQL_topic2_stream.name;
