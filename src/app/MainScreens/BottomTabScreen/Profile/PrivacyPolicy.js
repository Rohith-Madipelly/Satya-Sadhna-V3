import { Text, StyleSheet, ImageBackground, View, ScrollView, Image, TouchableOpacity, Alert, Platform, Button, RefreshControl, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { Component, useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from '@react-navigation/native';
import Ionic from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';



import { PrivacyPolicyAPI } from '../../../../network/API_Calls';

import NetInfo from '@react-native-community/netinfo';

import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar';

import { WebView } from 'react-native-webview';

import Metrics from '../../../../utills/ResposivesUtils/Metrics';


const PrivacyPolicy = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [data, setData] = useState("")
  const dispatch = useDispatch();
  let tokenn = useSelector((state) => state.token);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);


  // to set the Token Error
  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) {
    console.log("Error in token quotes", err)
  }

  // useEffect(() => {
  //   ProfileNameKosam()
  // }, [])


  // >>>>>>>>>>>>>>>>>
  const [refreshing, setRefreshing] = useState(false);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    ProfileNameKosam()
  }, []);
  // >>>>>>>>>>>>>>>>>>


  const ProfileNameKosam = async () => {
    setSpinnerbool(true)
    try {
      const res = await PrivacyPolicyAPI(tokenn)
      if (res) {
        // console.log(">>>", res.data)
        setData(res.data.privacyPolicy)
        setSpinnerbool(false)
      }
      else {

      }
    } catch (error) {
      setTimeout(() => {
        console.log("Error in fetching", error)
      }, 1000);
    }
    finally {
      setSpinnerbool(false)
      setRefreshing(false);
    }
  }






  const navigation = useNavigation();

  if (!isConnected) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
        <Text>No network found</Text>
        <Text>Please check your internet connection</Text>
        <Button title='go to Downloads' onPress={() => { navigation.navigate("Downloads") }}></Button>
      </View>
    );
  }
  if (spinnerBool) {
    return (
      <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />
    )
  }

  return (
    // <ScrollView>
    <View style={{ height: '100%' }}>

      <CustomStatusBar barStyle="dark-content" backgroundColor="white" />
      {/* <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
        <LinearGradient style={{ height: "100%", }} colors={['rgba(20, 0, 255, 0.75)', 'rgba(255, 255, 255, 0.77)', '#FFF']}>

        </LinearGradient>
      </View> */}
      <View style={{ position: 'relative', top: '2%', backgroundColor: 'pink', height: '100%', borderRadius: 30, overflow: 'scroll', backgroundColor: 'white' }}>
        {/* <Text style={{ fontWeight: 900, fontSize: 23, marginBottom: 5, marginLeft: 20, marginTop: 20 }}>Privacy Policy</Text> */}

        {/* <ScrollView> */}
          <View style={{ 
            // margin: 10,
            // marginTop:15
            marginBottom:20
            }}>

            {/* <Text>{data}</Text>
             */}


            <WebView
              style={{width:'100%',
                // flex:1,
                height:200,
                height:Metrics.height-100,
                // backgroundColor:'#D0D0D0',
                borderRadius:20
              }}
              source={{ uri: 'https://satyasadhna.com/privacypolicy' }}
            />


            <View style={{ height: 150 }}>
            </View>
          </View>
        {/* </ScrollView> */}
      </View>
    </View>
  )
}

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'red'
    // marginTop: Constants.statusBarHeight,
  },
  backgroundContainer: {
    backgroundColor: 'pink',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  inputContainer: {
    backgroundColor: 'red',
    padding: 20,
  },
  absolutePosition: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
