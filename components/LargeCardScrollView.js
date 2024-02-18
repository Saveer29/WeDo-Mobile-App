import React, { useState } from "react";
import { ScrollView, StyleSheet, Dimensions, View, TouchableOpacity } from "react-native";
import LargeCard from "./LargeCard";

const windowWidth = Dimensions.get("window").width;

const cardWidth = windowWidth - 40; 
const gapWidth = 20; 
const cardHeight = 400;
const LargeCardScrollView = ({ data, navigation }) => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / (cardWidth + gapWidth));
    setActiveDotIndex(currentIndex);
  };

  const totalCardWidth = cardWidth + gapWidth;

  const totalHeight = cardHeight;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        snapToInterval={totalCardWidth} 
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        style={{ width: windowWidth, height: totalHeight, overflow: "visible" }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {data.map((item, index) => (
          <View
            key={item.id}
            style={{ width: cardWidth, marginRight: index === data.length - 1 ? 0 : gapWidth }}
          >
            <LargeCard
              title={item.title}
              subTitle={item.date}
              image={item.imageUriList}
              onPress={() => navigation.navigate("Event Details", item)}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === activeDotIndex ? "#007AFF" : "#D0D0D0" },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: cardHeight,
    marginBottom: 80,
    paddingTop: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default LargeCardScrollView;
