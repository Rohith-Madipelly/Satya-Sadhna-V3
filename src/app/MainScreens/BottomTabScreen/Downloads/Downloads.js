import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar'

const Downloads = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <CustomStatusBar barStyle="dark-content" backgroundColor="white" />
      <Text>Downloads</Text>
    </View>
  )
}

export default Downloads

const styles = StyleSheet.create({})