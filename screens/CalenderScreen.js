import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import Screen from '../components/Screen';
import eventsApi from '../api/events';
import CalenderCard from '../components/CalenderCard'; 
function CalendarScreen({ navigation }) {
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());


  const customTheme = {
    calendarBackground: '#FFFFFF',
    selectedDayBackgroundColor: '#B353DF',
    selectedDayTextColor: '#FFFFFF',
    todayTextColor: '#B353DF', 
    dayTextColor: '#B353DF',
    textDisabledColor: '#CCCCCC',
    dotColor: '#b353df', 
    selectedDotColor: '#FFFFFF',
    arrowColor: '#000000',
    monthTextColor: '#FFFFFF',
  };

  const loadItems = async (day) => {
    try {
      if (day.dateString) {
        const formattedDate = day.dateString;
        const response = await eventsApi.getEventsForDay(formattedDate);
        if (response.status === 200) {
          const eventData = response.data;
          const newItems = {
            [formattedDate]: eventData.map((event) => ({
              id: event.id,
              name: event.title,
              start: `${formattedDate}T${event.time}`,
              end: `${formattedDate}T${event.endTime}`,
              description: event.description,
              location: event.location,
              imageUriList: event.imageUriList, 
              date: event.date,
            })),
            ...items,
          };
          setItems(newItems);
        } else {
          console.error('Failed to fetch events in CalScreen: ', response.statusText);
        }
      } else {
        console.warn('Day date is undefined.');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const renderItem = (item) => {
    return (
      <View style={styles.eventItem}>
        <CalenderCard
          title={item.name}
          image={item.imageUriList}
          onPress={() => navigation.navigate('Event Details', item)}
        />

      </View>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>No events for today</Text>
      </View>
    );
  };

  const filteredEvents = items[selectedDate.toISOString().split('T')[0]] || [];

  return (
    <Screen>
      <View style={styles.container}>
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={selectedDate.toISOString().split('T')[0]}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyDate}
          theme={customTheme} 

        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    dayTextColor: "#B353DF"
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default CalendarScreen;
