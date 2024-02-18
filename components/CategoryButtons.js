import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const CategoryButtons = () => {
  const categories = ["Sport", "Gaming", "Charity", "Volunteer", "Arts (Music)"];

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryButton}>
      <Text style={styles.categoryButtonText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.categoriesContainer}>
      <Text style={styles.categoriesTitle}>Explore by category:</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    flex: 1,
    alignItems: "center",
  },
  categoriesTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
  categoryButtonText: {
    fontSize: 16,
  },
});

export default CategoryButtons;
