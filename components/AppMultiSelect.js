import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colours from "../config/colours";
import defaultStyles from "../config/defaultStyles";
import { AppText, ItemPicker, Screen } from "./";

function AppMultiSelect({
  icon,
  items,
  placeholder,
  selectedItems,
  width = "100%",
  onSelectItem,
  ...otherProps
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const handleSelectItem = (item) => {
    onSelectItem(item);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={25}
              color={colours.lightBlue}
              style={styles.icon}
            />
          )}
          <AppText style={styles.text}>
            {selectedItems?.length > 0
              ? selectedItems.map((item) => item.label).join(", ")
              : placeholder}{" "}
          </AppText>
          <MaterialCommunityIcons
            name={"chevron-down"}
            size={25}
            color={colours.lightBlue}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <ItemPicker
                item={item}
                label={item.label}
                onPress={() => {
                  handleSelectItem(item);
                  setModalVisible(false);
                }}
                selected={selectedItems?.includes(item)}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: { marginRight: 10 },
  textInput: defaultStyles.text,
  text: {
    flex: 1,
  },
});

export default AppMultiSelect;
