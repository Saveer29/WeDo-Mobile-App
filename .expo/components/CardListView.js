import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import MediumCard from "./MediumCard";

const CardListView = ({ data, navigation }) => {
  const getDate = (event) => {
    const eventDate = new Date(`${event.date}T${event.time}`);

    const dateFormatOptions = {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
    };


    const timeFormatOptions = {
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true, 
    };

    const date = eventDate.toLocaleDateString('en-US', dateFormatOptions); 
    const time = eventDate.toLocaleTimeString('en-US', timeFormatOptions); 

    return `${date} at ${time}`; 
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MediumCard
            title={item.title}
            subTitle={getDate(item)}
            image={item.imageUriList}
            onPress={() => navigation.navigate("Event Details", item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CardListView;
