import { StyleSheet, Text, View,Linking, TouchableOpacity } from 'react-native'
import React from 'react'

export const CustomLinking = (url,info) => {

    try {
        Linking.openURL(url)   
        // .catch((err) => console.error('An error occurred', err));
    } catch (error) {
        console.error('An error occurred', err)
    }
}



const styles = StyleSheet.create({})