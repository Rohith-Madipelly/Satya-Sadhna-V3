import { Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format, parseISO } from 'date-fns';

const CustomDateInput2 = forwardRef(({
  boxWidth = "80%",
  style,

  //label
  label,
  labelStyle,
  asterisksymbol,
  outlined,
  //placeholder
  placeholder,
  placeholderTextColor = "#444",

  //container
  containerStyle,
  borderColor,
  bgColor = "transparent",

  //leftIcon
  leftIcon,

  //rightIcon
  rightIcon,

  //errorMessage
  errorMessage,
  errorColor = "red",

  //leftText
  leftText,

  //Date Modules
  shouldOpen = true,
  value,
  onChangeDate,

  //minimumDate
  minimumDate,
  maximumDate,

  TextDisplay,
}, ref) => {
  const [selectedDate, setSelectedDate] = useState(value ? value.toString() : '');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const [errorData, setErrorData] = useState('')

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("date", date)
    const formatted = format(date, 'yyyy-MM-dd');
    console.warn("Formatted Date: ", formatted);
    setSelectedDate(formatted)
    if (onChangeDate) onChangeDate(formatted)
    hideDatePicker();
  };

  // Expose methods to parent using ref
  useImperativeHandle(ref, () => ({
    openPicker: showDatePicker,
    closePicker: hideDatePicker,
    clearDate: () => {
      setSelectedDate('');
      if (onChangeDate) onChangeDate('');
    }
  }), [onChangeDate]);

  // Choose a fallback date when myDate is null or invalid
  let fallbackDate = new Date();
  let parsedDate;
  try {
    parsedDate = value ? parseISO(value) : fallbackDate;
    if (isNaN(parsedDate.getTime())) parsedDate = fallbackDate;
  } catch {
    parsedDate = fallbackDate;
  }

  const backgroundColor = bgColor || 'white';
  const containerBorder = outlined ? styles.outlined : styles.standard;

  useEffect(() => {
    setSelectedDate(value ? value.toString() : '');
  }, [value])

  return (
    <View style={[{ padding: 0, width: boxWidth }, style, styles.boxHeight]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label} {asterisksymbol && <Text style={{ color: '#C30909' }}>*</Text>}
        </Text>
      )}
      <View
        style={[
          styles.container,
          containerBorder,
          containerStyle,
          { borderColor: borderColor ? borderColor : styles?.outlined?.borderColor, backgroundColor: backgroundColor },
        ]}
      >
        {leftIcon && <View style={{ paddingRight: 7 }}>{leftIcon}</View>}

        <TouchableOpacity
          onPress={() => {
            console.log("hdsgjh")
            if (!shouldOpen) {
              Alert.alert("Please select start date")
            } else {
              showDatePicker()
            }
          }}
          style={[styles.Inputstyling, { flex: 0.95, justifyContent: 'center' }]}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={parsedDate}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
          />
          {leftIcon && <View style={{ paddingRight: 7 }}>
            {leftIcon}
          </View>}
          <TextInput
            placeholder={placeholder ? placeholder : label ? `Enter ${label}` : ''}
            placeholderTextColor={placeholderTextColor}
            value={TextDisplay ? formatDate(value, TextDisplay) : value}
            ellipsizeMode="tail"
            editable={false}
            style={{ flex: 1, height: '80%', paddingStart: 5, width: '100%',left:10 }}
          />
        </TouchableOpacity>
        {rightIcon && <TouchableOpacity
          onPress={() => {
            showDatePicker()
          }}
        >
          {rightIcon}
        </TouchableOpacity>}
      </View>
      {(errorMessage || errorData) ? (
        <Text style={{ color: errorColor, marginLeft: 15 }}>{errorMessage || errorData}</Text>
      ) : null}
      {leftText && (
        <Text style={[styles.label, { marginTop: -20, fontSize: 9, color: '#47556980', marginLeft: 10 }]}>
          {leftText}
        </Text>
      )}
    </View>
  )
})

CustomDateInput2.displayName = "CustomDateInput2";

export default CustomDateInput2

const styles = StyleSheet.create({
  label: {
    fontWeight: '400',
    marginBottom: 4,
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
    lineHeight: 24,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  Inputstyling: {
    height: 45,
  },
  outlined: {
    borderWidth: 1,
    borderColor: '#4C5664',
  },
});

function formatDate(input, format) {
  if (!input) {
    return ""
  }
  // Ensure compatibility for both 'YYYY-MM-DD' and ISO formats
  const date = new Date(input);
  if (isNaN(date.getTime())) {
    return "";
  }

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return format
    .replace(/DD/, day)
    .replace(/MM/, month)
    .replace(/YYYY/, year);
}
