import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomFallback = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>CustomFallback</Text>
    </View>
  )
}

export default CustomFallback

const styles = StyleSheet.create({})