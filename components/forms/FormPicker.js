import React, { useState } from "react";
import { useFormikContext } from "formik";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from "react-native";

import ErrorMessage from "./ErrorMessage";
import { AppPicker, DatePicker } from "../";

function AppFormPicker({ mode = false, items, name, placeholder, width }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [placeholderText, setPlaceholderText] = useState(false);

  const handleDateConfirm = (dateTime) => {
    setDatePickerVisible(false);

    let value = "";
    let formatOptions = {};

    if (mode === "date") {
      formatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      value = dateTime ? dateTime.toISOString().split("T")[0] : "";
    } else if (mode === "time") {
      formatOptions = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      value = dateTime ? dateTime.toISOString().split("T")[1] : "";
    }

    setPlaceholderText(dateTime.toLocaleString([], formatOptions));
    setFieldValue(name, value);
  };

  return (
    <>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
      />
      {mode ? (
        <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
          <DatePicker
            placeholder={values[name] ? placeholderText : placeholder}
            width={width}
          />
        </TouchableOpacity>
      ) : (
        <AppPicker
          items={items}
          onSelectItem={(item) => setFieldValue(name, item)}
          placeholder={placeholder}
          selectedItem={values[name]}
          width={width}
        />
      )}

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
