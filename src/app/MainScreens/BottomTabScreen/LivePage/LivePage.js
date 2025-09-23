import { Alert, Button, Dimensions, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { LivePageData } from '../../../../network/API_Calls';
import YoutubePlayer from "react-native-youtube-iframe";
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../../../componentsOld/ButtonC1';
import NetInfo from '@react-native-community/netinfo';


import NoInternetImage from '../../../../assets/SVGS/UIScrees/NoInternetImage';
import Metrics from '../../../../utills/ResposivesUtils/Metrics';
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar';



const LiveScreen = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  let tokenn = useSelector((state) => state.login.token);

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [livePage, setLivePage] = useState()
  const [VideoID, setVideoID] = useState()

  const navigation = useNavigation();
  const [playing, setPlaying] = useState(false);



  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);


  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);







  const { width, height } = Dimensions.get('screen')
  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) {
    console.log("Error in token quotes", err)
    if (err.response.status === 500) {
      console.log("Internal Server Error", err.message)
    }
  }


  useEffect(() => {
    if (isConnected) {
      HomeData()
    }
  }, [isConnected])

  const HomeData = async () => {

    setSpinnerbool(true)

    try {
      const res = await LivePageData(tokenn)

      if (res) {
        setLivePage(res.data)
        // setVideoID(getIdFromUrl(res.data.liveUrl))
      }
      else {
        console.log("No Res")

      }


    } catch (error) {
      console.log(">>>>>>>.", error)
      Alert.alert(`Something Went Wrong ${error.code} `)


      if (error.response) {
        if (error.response.status === 401) {
          console.log("Error With 400.>>>>>>>>>>>>>>>>>>>>>>>>>>>>", error.response.status)
          // ErrorResPrinter("Failed Please Login again ")
          Alert.alert('something went wrong', 'Please Login again',
            [{ text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            {
              text: 'YES', onPress: () => {
                // LogOutHandle()
                LogOutHandle123(dispatch)
                // navigation.navigate('Decide-navigator')
              }
            }]
          )
        }
        else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message)
        }
      }
      else if (error.request) {
        // Alert.alert("Something Went Wrong")
      }
      else {
        Alert.alert("Error in Setting up the Request")
      }


    }
    finally {
      setSpinnerbool(false)
      // setRefreshing(false)

    }
  }



  if (!isConnected) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
        <NoInternetImage />
        <Text style={{ fontFamily: 'Gabarito-VariableFont', color: 'rgba(3, 3, 112, 1)', fontSize: Metrics.rfv(20), marginTop: 18 }}>No network found</Text>
        <Text style={{ fontFamily: 'Gabarito-VariableFont', color: 'rgba(3, 3, 112, 1)', fontSize: Metrics.rfv(18) }}>Please check your internet connection</Text>
        <Button title='go to Downloads' onPress={() => { navigation.navigate("Downloads") }}></Button>
      </View>
    );
  } else {
  }



  return (
    <ScrollView
    // refreshControl={
    //   <RefreshControl
    //     refreshing={refreshing}
    //     onRefresh={onRefresh}
    //   />
    // }
    >

      <CustomStatusBar barStyle="dark-content" backgroundColor="white" />

      {!livePage ? (
        <View style={{ backgroundColor: 'black', height: 202, justifyContent: 'center', alignItems: 'center', margin: 5, marginTop: 10 }}>
          <Text style={{ color: 'white', fontSize: 25 }}>Live Screen</Text>
          <Text style={{ color: 'white' }}>Currently live was ended or not available</Text>
        </View>
      ) : (
        <View style={{ width: '100%' }}>
          <View style={{ flex: 1 }}>
            <YoutubePlayer
              height={height >= 1000 ? height * 0.44 : height * 0.28}
              play={playing}
              videoId={VideoID || "Wr4iJon5zC8"}
              onChangeState={onStateChange}
              showinfo={true}
              controls={1}
              onReady={(e) => { console.log("Jhgfc", e) }}
              contentScale={0.9}
            />
          </View>

          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View style={{ width: '50%' }}>
              <CustomButton
                onPress={togglePlaying}
                styleData={{ paddingHorizontal: 10, marginVertical: 5 }}
              >
                {playing ? "Pause" : "Watch Live"}
              </CustomButton>
            </View>

            <Text style={{ width: "90%", fontSize: 20, fontWeight: '700', color: 'black' }}>{livePage.title}</Text>

            <View style={{
              width: "90%",
              height: 260, // Set fixed height for scrollable description
              // marginVertical: 10
            }}>
              <ScrollView>
                <Text>
                  <Text style={{ fontWeight: '600', color: 'black' }}>Description: </Text>
                  {livePage.description}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  )

}

export default LiveScreen

const styles = StyleSheet.create({})