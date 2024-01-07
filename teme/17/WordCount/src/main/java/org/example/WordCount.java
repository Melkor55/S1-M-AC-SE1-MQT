package org.example;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;

import java.util.Arrays;

public class WordCount {

    public static void main(String[] args) {

        // Create a SparkConf object
        SparkConf sparkConf = new SparkConf().setAppName("WordCount").setMaster("local");;

        // Create a JavaSparkContext object
        JavaSparkContext sparkContext = new JavaSparkContext(sparkConf);

        // Read the file into an RDD
        JavaRDD<String> lines = sparkContext.textFile("./src/main/java/org/example/textFileContainingWord.txt");

        // Split each line into words and filter for the word "master"
        JavaRDD<String> words = lines.flatMap(line -> Arrays.asList(line.split(" ")).iterator())
                .filter(word -> word.equalsIgnoreCase("master"));

        // Count the occurrences of the word "master"
        long count = words.count();

        // Print the count
        System.out.println("The word 'master' appears " + count + " times in the file.");

        // Close the Spark context
        sparkContext.close();
    }
}
