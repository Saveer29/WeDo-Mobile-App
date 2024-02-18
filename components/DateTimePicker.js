import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function DateTimePicker({ onSelectDate, onSelectTime }) {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const handleDateConfirm = (date) => {
    onSelectDate(date);
    setDatePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    onSelectTime(time);
    setTimePickerVisible(false);
    
  };

  return (


    <>
      <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
        <Text>Select Date</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
        <Text>Select Time</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisible(false)}
      />
    </>
  );
}

export default DateTimePicker;
