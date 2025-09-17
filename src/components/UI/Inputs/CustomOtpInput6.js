import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';


//  keyboardType="number-pad"

const CustomOtpInput6 = ({
  value,
  length = 6,
  secure,
  autoComplete,
  keyboardType,
  onChangeText,
  onBlur,
  onOtpSubmit = (combinedOtp) => { console.log(combinedOtp) },
  errorBoxid,
  errorMessage,
  errorColor = 'red',
  onClear,
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const [selectedInput, setSelectedInput] = useState(0);
  const [errorInput, setErrorInput] = useState([0, 1, 2, 3]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const clearValues = async () => {
    setOtp(new Array(length).fill("")); // Clear OTP fields
    setErrorInput([]); // Clear error highlighting
    setSelectedInput(0);
    inputRefs.current[0].focus(); // Refocus on the first input
  };

  useEffect(() => {
    if (onClear) {
      clearValues(); // Trigger clear when onClear is true
    }
  }, [onClear]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Submit trigger
    const combinedOtp = newOtp.join("");
    onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleFocus = (index) => {
    setSelectedInput(index);
  };

  const handleKeyPress = (index, { key }) => {
    if (key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            autoComplete={autoComplete}
            secureTextEntry={secure}
            keyboardType={keyboardType}
            onBlur={onBlur}
            onChangeText={(value) => {
              handleChange(index, value);
              onChangeText(index, value);
            }}
            onFocus={() => handleFocus(index)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent)}
            maxLength={1}
            style={[
              styles.otpInput,
              styles.outlined,
              index === selectedInput && styles.selectedInput,
              errorBoxid.includes(index) && styles.ErrorInput,
              {color:'white'}
            ]}
          />
        ))}
      </View>
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Text style={{ color: errorColor }}>{errorMessage}</Text>
      </View>
    </View>
  );
};

export default CustomOtpInput6;

const styles = StyleSheet.create({
  otpInput: {
    width: 40,
    height: 40,
    margin: 5,
    marginBottom: 0,
    textAlign: 'center',
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: 'white',
    fontSize: 18,
  },
  selectedInput: {
    borderColor: '#44689C',
    borderWidth:2
  },
  ErrorInput: {
    borderColor: 'red',
  },
});
