import Spinner from 'react-native-loading-spinner-overlay';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'



const LoaderComponents = ({ visible, color, animation }) => {
  return (
    <Spinner
      visible={visible}
      color={"white"}
      animation={'fade'}
    // textContent="Loading ...."
    // textStyle={{color:'red'}}
    // customIndicator={
    //   <View>
    //     <LoadingAnimation/>
    //   </View>
    // }
    />
  )
}

export default LoaderComponents
 
const styles = StyleSheet.create({})