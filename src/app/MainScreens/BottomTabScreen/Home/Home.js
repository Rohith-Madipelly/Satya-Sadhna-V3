import { Alert, ImageBackground, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar'
import { useDispatch, useSelector } from 'react-redux';
import NoInternetScreen from '../../../OtherScreens/NoInternetScreen';

import { GlobalStyles } from '../../../../components/UIConfig/GlobalStyles'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import FormDataIcons from '../../../../assets/SVGS/Home/FormDataIcons';
import Donation from '../../../../assets/SVGS/Home/Donation';
import QuoteIconColorHome from '../../../../assets/SVGS/Home/QuoteIconColorHome';
import TracksIcons from '../../../../assets/SVGS/Home/TracksIcons';
import LoadingImage from '../../../../components/UI/ImageConatiners/LoadingImage';
import Metrics from '../../../../utills/ResposivesUtils/Metrics';

import { useToast } from 'react-native-toast-notifications';
import { GET_ALL_BHAJANAS, GET_ALL_PRAVACHANS, GET_ALL_UPCOMING_EVENTS, HomePageData } from '../../../../network/API_Calls';
import QuoteOfDay from '../../../../Components2/Quote/QuoteOfDay';
import MusicList from '../../../../Components2/Music/MusicList';

const Home = () => {
  let isConnected = useSelector((state) => state.ApiDataRedux.isConnected);
  let tokenn = useSelector((state) => state.login.token);

  const navigation = useNavigation()
  const dispatch = useDispatch();
  const toast = useToast();


  const [spinnerBool, setSpinnerbool] = useState(false)
  const [isData, setIsData] = useState()
  const [Banners, setBanners] = useState()
  const [Quote, setQuote] = useState()
  const [meditationTracks, setMeditationTracks] = useState()
  const [pravachan, setPravachan] = useState()
  const [previousEvents, setPreviousEvents] = useState()
  const [bhanaja, setBhanaja] = useState([])
  const [upComingEvents, setUpComingEvents] = useState()


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (isConnected) {
      HomeData()
    }

  }, []);


  useEffect(() => {
    if (isConnected) {
      HomeData()
    }
  }, [isConnected])

  useFocusEffect(
    useCallback(() => {
      if (isConnected) {
        HomeData()
      }
    }, [])
  )


  const [formStatus, setFormStatus] = useState(true)

  const HomeData = async () => {
    setSpinnerbool(true)
    try {
      const res = await HomePageData(tokenn)
      if (res) {
        setFormStatus(res.data.formStatus)
        setQuote(res.data.recentQoute.quote)
        setIsData(true)
        setMeditationTracks(res.data.meditationTracks)
      }
      const res2 = await GET_ALL_PRAVACHANS(tokenn)
      if (res2.data) {
        setPravachan(res2.data.allPravachans)
      }
      const res3 = await GET_ALL_BHAJANAS(tokenn)
      if (res3.data) {
        setBhanaja(res3.data.allBhajanas)
      }
      const res4 = await GET_ALL_UPCOMING_EVENTS(tokenn)
      if (res4.data) {
        setUpComingEvents(res4.data.allUpcomingEvents)
      }
      else {
        console.log(">>> 123")
      }


    } catch (error) {
      console.error(error.response)
      setIsData(false)

      if (error.response) {
        if (error.response.status === 401) {
          Alert.alert('Something went wrong', 'Please login again',
            [{ text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            {
              text: 'YES', onPress: () => {
                // LogOutHandle123(dispatch);
              }
            }]
          );
        } else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message);
        }
      } else if (error.request) {
        // Alert.alert("Something went wrong");
      } else {
        Alert.alert("Error in setting up the request");
      }
    }
    finally {
      setSpinnerbool(false)
      setRefreshing(false)
    }
  }



  if (!isConnected) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center', alignItems: 'center'
      }}>
        <CustomStatusBar backgroundColor={""} />
        <NoInternetScreen />
      </View>)
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomStatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={{ height: 10 }}>
        </View>

        {/* About Satya sadhna */}
        <TouchableOpacity style={{ maxHeight: Metrics.height * 0.12, minHeight: 120, backgroundColor: '#030370', padding: 10, marginHorizontal: 10, borderRadius: 13 }} onPress={() => { navigation.navigate("About_SatyaSadhana") }}>
          <ImageBackground
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%' }}
            // contentFit="fixed"
            blurRadius={0.2}
            resizeMode='fill'
            source={require("../../../../assets/Image/Home/Vector.png")}
          >
            <View style={{ width: '100%', margin: 5, marginTop: 10, marginLeft: 7 }}>
              <Text style={{ fontFamily: 'VIVALDII', color: 'white', fontSize: Metrics.rfv(29) }}>Satya Sadhna Meditation</Text>
              <Text style={{ fontFamily: 'Gabarito-VariableFont', color: 'white', fontSize: Metrics.rfv(15), }}>The path to peace of mind & eternal bliss</Text>
            </View>

            <TouchableOpacity style={{ flexDirection: 'row', margin: 5, marginLeft: 7 }} onPress={() => { navigation.navigate("About_SatyaSadhana") }}>
              <Text style={{ fontFamily: 'Gabarito-VariableFont', color: 'white', fontSize: Metrics.rfv(10) }}>Learn More</Text><Entypo name="chevron-right" size={Metrics.rfv(12)} color="white" />
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>

        {/* Square Box */}
        <View style={{
          height: Metrics.rfv(100, 700),
          flexDirection: 'row', justifyContent: 'space-evenly', padding: 5, marginHorizontal: 5, borderRadius: 13, marginTop: 5, gap: 3
        }}>

          {/* {!formStatus &&  */}
          <TouchableOpacity style={{ flex: 0.23, }}
            onPress={() => {
              navigation.navigate("FormScreen")
            }}
          >

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(168, 168, 255, 0.19)', borderRadius: 13, }}>
              <FormDataIcons height={Metrics.rfv(25, 700)} width={Metrics.rfv(25)} />
            </View>

            <View style={{ marginTop: 5 }}>
              <Text style={{ textAlign: 'center', fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(12) }}>Register</Text>
            </View>
          </TouchableOpacity>
          {/* } */}

          <TouchableOpacity style={{ flex: 0.23, }}
            onPress={() => {
              navigation.navigate("Donation")
            }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(168, 168, 255, 0.19)', borderRadius: 13, }}>
              <Donation height={Metrics.rfv(25, 700)} width={Metrics.rfv(25)} />
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={{ textAlign: 'center', fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(12) }}>Donation</Text>
            </View>
          </TouchableOpacity>



          <TouchableOpacity style={{
            flex: 0.23,
          }}
            onPress={() => {
              navigation.navigate("Quotes")
            }}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(168, 168, 255, 0.19)', borderRadius: 13, }}>
              {/* <Donation /> */}
              <QuoteIconColorHome height={Metrics.rfv(20)} width={Metrics.rfv(22)} />
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={{ textAlign: 'center', fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(12) }}>Quotes</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 0.23, }}
            onPress={() => {
              navigation.navigate("TracksAudios")
            }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(168, 168, 255, 0.19)', borderRadius: 13, }}>
              <TracksIcons height={Metrics.rfv(25, 700)} width={Metrics.rfv(25)} />
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={{ textAlign: 'center', fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(12) }}>
                All Tracks
                {/* Tracks & Audios */}
              </Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity style={{
                flex: 0.23,
              }}
                onPress={() => {
                  onShare("https://play.google.com/store/apps/details?id=vardhaman.satyasadhnaOne&hl=en")
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(168, 168, 255, 0.19)', borderRadius: 13, }}>
                  <FontAwesome5 name="share-square" size={24} color="rgba(3, 3, 112, 1)" />
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(12) }}>Share our app</Text>
                </View>
              </TouchableOpacity> */}

        </View>


        {/* About  */}
        <View style={{ position: 'relative', marginTop: Metrics.rfv(30) }} onPress={() => { navigation.navigate("About_Guruji") }}>
          <View style={{ flexDirection: 'row', maxHeight: Metrics.height * 0.12, minHeight: 120, backgroundColor: 'rgba(168, 168, 255, 0.19)', padding: 5, marginHorizontal: 10, borderRadius: 13, }}>
            <View
              style={{ width: '60%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%' }}
            >
              <View style={{ width: '65%', margin: 5, marginTop: 10, marginLeft: 7 }}>
                <Text style={{ fontFamily: 'Gabarito-VariableFont', fontSize: Metrics.rfv(18), color: '#030370', }}>About Acharya Ji</Text>
                <Text style={{ fontFamily: 'Gabarito-VariableFont', fontSize: Metrics.rfv(11), color: '#030370', marginBottom: 5 }}>Acharya Jin Chandra Suriji himself started  practicing meditation from the initial days of his Acharyapad.</Text>
              </View>

              <TouchableOpacity style={{ flexDirection: 'row', margin: 5, marginLeft: 7 }} onPress={() => { navigation.navigate("About_Guruji") }}>
                <Text style={{ fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(10) }}>Learn More</Text><Entypo name="chevron-right" size={Metrics.rfv(12)} color="#030370" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ width: '40%', position: 'absolute', bottom: 0, right: 3 }}>
            <LoadingImage
              source={require("../../../../assets/Image/Home/AboutImage.png")}
              // style={{ minHeight: Metrics.height * 0.18, minHeight: 260, }}
              style={{ minHeight: Metrics.height * 0.18, maxHeight: Metrics.height * 0.18 }}
              loaderColor="#ff0000"
              resizeMode='contain'
            />
          </View>
        </View>


        {isData && meditationTracks ? <MusicList Data={meditationTracks} ClickAction={(item, download) => {
          console.log("Helo", item);
          // NavigationTo(item, download)
        }} /> : ""}

        <QuoteOfDay Quote={Quote || "If you want peace then calm your desires"} isQuoteOfDay={true} disabled={false} />
        {/* <Snap_Carousel2 BannerData2={meditationTracks} CarouselName={'Meditation Tracks'} /> */}




        <Text>Home</Text>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})