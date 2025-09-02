import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import CustomStatusBar from '../../../components/UI/CustomStatusBar/CustomStatusBar'
import Metrics from '../../../utills/ResposivesUtils/Metrics'


const TracksAudios = ({ navigation }) => {
  const bgColor = "rgba(168, 168, 255, 0.30)"
  const Pages = ['For Old Sadhak', 'For New Sadhak', `For Children's`]


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'All Tracks',
    });
  }, [navigation]);
  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white',
      paddingHorizontal: 17
      // justifyContent: 'center', alignItems: 'center'
    }}>
      <CustomStatusBar barStyle="dark-content" backgroundColor="white" />

      {Pages&&Pages?.map((Data, index) => (

        <TouchableOpacity
          key={index}
          style={{
            maxHeight: Metrics.height * 0.12,
            minHeight: 120,
            // backgroundColor: bgColor ? bgColor : 'rgba(168, 168, 255, 0.30)',
            backgroundColor: bgColor ? bgColor : 'rgba(168, 168, 255, 0.30)',
            padding: 10, borderRadius: 13,
            marginVertical: 10
          }} onPress={() => { navigation.navigate("TracksListByCategory", { Category: Data }) }}>
          <ImageBackground
            style={{ position: 'relative', display: 'flex', width: '100%', height: '100%', }}
            // contentFit="fixed"
            // blurRadius={0.2}
            resizeMode='fill'
            // source={require("../../assets/image/Home/Vector2.png")}
            source={require("../../../assets/Image/Home/Vector2.png")}
          >
            {/* <View key={index} style={{ marginVertical: 10 }}>
          <TouchableOpacity style={{backgroundColor:'rgba(255, 242, 176, 1)',padding:5,paddingHorizontal:10,height:40,borderRadius:10,justifyContent:'center',}}> */}
            {/* <Text style={{ color: 'rgba(162, 127, 82, 1)', fontFamily: 'Gabarito-VariableFont', fontWeight: 400, fontSize: Metrics.rfv(24) }}>{Data}</Text>
            <Text style={{ color: 'rgba(162, 127, 82, 1)', fontFamily: 'Gabarito-VariableFont', fontWeight: 400, fontSize: Metrics.rfv(14),marginTop:5 }}>Click to view the Audio Tracks</Text> */}

            <Text style={{ color: 'rgba(3, 3, 112, 1)', fontFamily: 'Gabarito-VariableFont', fontWeight: 400, fontSize: Metrics.rfv(24) }}>{Data}</Text>
            <Text style={{ color: 'rgba(3, 3, 112, 1)', fontFamily: 'Gabarito-VariableFont', fontWeight: 400, fontSize: Metrics.rfv(14), marginTop: 5 }}>Click to view the Audio Tracks</Text>
            {/* </TouchableOpacity>
        </View> */}
          </ImageBackground>
        </TouchableOpacity>
      ))}


    </View>
  )
}

export default TracksAudios

const styles = StyleSheet.create({})