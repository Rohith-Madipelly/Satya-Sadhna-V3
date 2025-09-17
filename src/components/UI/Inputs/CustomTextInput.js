import { StyleSheet, Text, TextInput, View, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'

const CustomTextInput = ({
    boxWidth,
    ref,
    label,
    labelStyle,
    rightLabelBtn,
    style,
    value,
    placeholder,
    placeholderTextColor,
    autoComplete,
    containerStyle,
    keyboardType,
    autoCapitalize,
    outlined,
    onBlur,
    asterisksymbol,
    leftIcon,
    rightIcon,
    numLines,
    onChangeText,
    borderColor,
    secure,
    validate,
    editable,
    errorMessage,
    errorColor = 'red',
    bgColor,
    maxLength,
    InputStyle,
    leftText,
    inputRef,
    onSubmitEditing,
    returnKeyType,
    blurOnSubmit,


}) => {

    const backgroundColor = bgColor || 'white';
    const containerBorder = outlined ? styles.outlined : styles.standard;
    const [errorData, setErrorData] = useState()



    // "visible-password"
    // "number-pad"
    // "phone-pad"


    //     useEffect(()=>{
    // onChangeText(value.trim());
    //     },[onBlur])
    return (
        <View style={[{ padding: 0, width: boxWidth }, style, styles.boxHeight]}>
            {label ? <Text style={[styles.label, labelStyle]}>{label} {asterisksymbol ? <Text style={{ color: '#C30909' }}> *</Text> : ""}</Text> : ""}


            <View style={[styles.container, containerBorder, containerStyle, { borderColor: borderColor }, { backgroundColor: backgroundColor }]}>
                {leftIcon&&<View style={{ paddingRight: 7 }}>
                    {leftIcon}
                </View>}
                <TextInput
                    placeholder={placeholder ? placeholder : label ? `Enter ${label}` : ''}
                    placeholderTextColor={placeholderTextColor ? placeholderTextColor : "white"}
                    value={value}
                    secureTextEntry={secure}
                    autoComplete={autoComplete}
                    keyboardType={keyboardType}

                    autoCapitalize={autoCapitalize}

                    onChangeText={(e) => {

                        onChangeText(e); // Pass the formatted text back
                    }}

                    // onChangeText={(e) => {
                    //     onChangeText(e.trimEnd());
                    // }}

                    ref={inputRef}
                    onSubmitEditing={onSubmitEditing}
                    // returnKeyType={returnKeyType}
                    returnKeyType={'next'}
                    onEndEditing={(e) => {
                        onChangeText(e.nativeEvent.text.trim());
                        if (validate) {
                            validate(e);
                            // onBlur(e)
                        }
                    }}

                    maxLength={maxLength}
                    onBlur={onBlur}
                    // onEndEditing={validate}
                    multiline={numLines > 1 ? true : false}
                    numberOfLines={numLines}
                    editable={editable}
                    // style={[{ flex: 4 }, InputStyle]}
                    style={[InputStyle, styles.Inputstyling, { flex: 4, alignSelf: "center",fontWeight:Platform.OS=="ios"?300:400 }]}
                />
                 {rightIcon&&<View style={{ paddingLeft: 5 }}>
                    {rightIcon}
                </View>}
            </View>
            <Text style={{ color: errorColor, marginLeft: 15 }}>{errorMessage || errorData}</Text>
            {leftText && <Text style={[styles.label, { marginTop: -20, fontSize: 9, color: '#47556980', marginLeft: 10, textAlign: 'right' }]}>{leftText}</Text>}
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    label: {
        fontWeight: '400',
        marginBottom: 4,
        textTransform: 'none',
        fontFamily: 'Gilroy-Medium',
        fontSize: 14,
        lineHeight: 24,
        // marginLeft:5
    },
    container: {
        // padding: 10,
        flexDirection: 'row',
        alignItems: 'center',

        borderRadius: 5,
        paddingHorizontal: 10,


        // ...Platform.select({
        //     ios: {
        //         // shadowColor: 'black',
        //         // shadowOffset: { width: 0, height: 2 },
        //         // shadowOpacity: 0.2,
        //         // shadowRadius: 4,
        //     },
        //     android: {
        //         // elevation: 2,
        //     },
        // }),


    },
    Inputstyling: {
        height: 45
    },
    outlined: {
        borderWidth: 1,
    }
})