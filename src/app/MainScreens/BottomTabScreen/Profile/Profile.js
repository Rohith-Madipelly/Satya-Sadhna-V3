import { Alert, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar'
import LoaderComponents from '../../../../components/UI/Loadings/LoaderComponents';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { CustomLinking } from '../../../../utills/CustomLinking';
import { SERVICE_PROVIDER_WEBSITE } from '../../../../Enviornment';
import { Image, ImageBackground } from 'expo-image';
import { useDispatch, useSelector } from 'react-redux';
import { UserGetProfileDetails } from '../../../../network/API_Calls';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CustomAlerts_LogOut } from '../../../../utills/CustomReuseAlerts';
import { logoutFunctions } from '../../../../utills/LogOut';
import Constants from "expo-constants";
import Footer from '../../../../components/UI/Footer';
const Profile = () => {
  let tokenn = useSelector((state) => state.login.token);
  const version = Constants.expoConfig.version ?? "2.2.0";

  const [refreshing, setRefreshing] = useState(false);
  const [spinnerbool, setSpinnerbool] = useState(false)
  const [UserName, setUserName] = useState("")
  const [StartingLetter, setStartingLetter] = useState("")
  const [profilepic, setProfilepic] = useState(null)

  const [appLink, setAppLink] = useState()
  const [appCall, setAppCall] = useState()
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    ProfileNameKosam()
  }, []);


  const ProfileNameKosam = async () => {
    setSpinnerbool(true)
    // console.log(tokenn)
    try {
      const res = await UserGetProfileDetails(tokenn)
      if (res) {
        console.log(">>>", res.data)
        setUserName([res.data.username])
        setStartingLetter(res.data.username.charAt(0))
        var datadsd = res.data.profile_picture
        // Rate_Review(tokenn)

      }
    } catch (error) {
      console.log(">>>>>>>.", error)
      Alert.alert("")
    } finally {
      setSpinnerbool(false)
      setRefreshing(false);
    }

  }

  useEffect(() => {
    ProfileNameKosam()
  }, [])


  const LogOutAlert = async () => {
    CustomAlerts_LogOut(
      undefined, undefined,
      () => {
        logoutFunctions(dispatch)
      }
    )
  }


  const AccountData = [
    {
      name: "Profile",
      onPress: () => { navigation.navigate("FullProfile") },
      IconImage: require("../../../../assets/Image/ProfileLogos/account-circle-outline.png")
      // isDisplay: true
    },
    {
      name: "Password",
      onPress: () => { navigation.navigate("ProfilePassword") },
      IconImage: require("../../../../assets/Image/ProfileLogos/lock-outline.png")
      // isDisplay: hasAPIPermission("", "feature.familymember"),
    },
    {
      name: "Register for course",
      onPress: () => { navigation.navigate("FormScreen") },
      IconImage: require("../../../../assets/Image/ProfileLogos/eidt.png"),
      // isDisplay: hasAPIPermission("", "feature.vehicle"),
    }]

  const MoreData = [
    {
      name: "About Satya Sadhna",
      onPress: () => { navigation.navigate("About_SatyaSadhana") },
      IconImage: require("../../../../assets/Image/ProfileLogos/alert-circle-outline.png"),
      isDisplay: true
    },
    {
      name: "Know About Guruji",
      onPress: () => { navigation.navigate("About_Guruji") },
      IconImage: require("../../../../assets/Image/ProfileLogos/alert-circle-outline.png"),
      isDisplay: true
    },
    {
      name: "Privacy Policy",
      onPress: () => { navigation.navigate("PrivacyPolicy") },
      IconImage: require("../../../../assets/Image/ProfileLogos/account-lock-outline.png"),
      isDisplay: true
    },
    {
      name: "Delete Account Policy",
      onPress: () => { navigation.navigate("DeleteAccountPolicy") },
      IconImage: require("../../../../assets/Image/ProfileLogos/trash.png"),
      isDisplay: true
    },
    {
      name: "Log out",
      onPress: () => { LogOutAlert() },
      IconImage: require("../../../../assets/Image/ProfileLogos/trash.png"),
      isDisplay: true
    },
  ]
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomStatusBar barStyle="dark-content" backgroundColor="white" />
      <LoaderComponents visible={spinnerbool} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Profile Header */}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate("FullProfile")}
          style={{ marginBottom: 20 }}
        >
          <View style={styles.profileRow}>
            <View style={styles.profileLeft}>
              <View style={styles.outerCircle}>
                <ImageBackground
                  style={styles.innerCircle}
                  source={require("../../../../assets/Image/profile.png")}
                >
                  <Text style={styles.letter}>{StartingLetter?.toUpperCase()}</Text>
                </ImageBackground>
              </View>
              <View style={{ marginLeft: 14 }}>
                <Text style={styles.Heading_u3}>{UserName}</Text>
                <Text style={{ color: '#666' }}>Show profile</Text>
              </View>
            </View>
            <AntDesign name="right" size={18} color="black" />
          </View>
        </TouchableOpacity>

        {/* Accounts Section */}
        <View style={{ marginBottom: 28 }}>
          <Text style={[styles.Heading_u2, { marginBottom: 20 }]}>Accounts</Text>
          {AccountData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.listRow}
              onPress={item.onPress}
            >
              <View style={styles.listLeft}>
                <Image source={item.IconImage} style={styles.icon} />
                <Text style={styles.Heading_u3}>{item.name}</Text>
              </View>
              <AntDesign name="right" size={16} color="black" />
            </TouchableOpacity>
          ))}
        </View>

        {/* More Section */}
        <View style={{ marginBottom: 10 }}>
          <Text style={[styles.Heading_u2, { marginBottom: 20 }]}>More</Text>
          {MoreData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.listRow}
              onPress={item.onPress}
            >
              <View style={styles.listLeft}>
                {item.name == "Log out" ? <MaterialCommunityIcons name={'logout'} size={22} color={'black'} style={styles.icon} /> : item.name == "Delete Account Policy" ? <MaterialIcons name="policy" size={24} color="black" style={styles.icon} /> : <Image source={item.IconImage} style={styles.icon} />}
                <Text style={styles.Heading_u3}>{item.name}</Text>
              </View>
              <AntDesign name="right" size={16} color="black" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Version Info */}
        <View style={{ marginVertical: 10,marginTop:0 }}>
          <Footer />
        </View>
        {/* <View style={{ marginVertical: 10 }}>
          <Text style={{ color: '#001F2099', textAlign: 'center' }}>
            Version 2.2.0
          </Text>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 8,
            }}
            onPress={() => {
              CustomLinking(SERVICE_PROVIDER_WEBSITE);
            }}
          >
            <MaterialIcons name="copyright" size={15} />
            <Text
              style={{
                fontWeight: 'bold',
                marginLeft: 5,
                fontSize: 15,
                color: "black"
              }}
            >
              Analogue IT Solutions
            </Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
}
export default Profile;
const styles = StyleSheet.create({
  Heading_1: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '400',
    //width:'100%'
  },
  Heading_u2: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
  Heading_u3: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },
  container: {
    width: '100%',
    flex: 1,

  },



  outerCircle: {
    width: 50,
    height: 50,
    borderRadius: 75,
    overflow: 'hidden',
  },
  innerCircle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    fontSize: 24,
    color: '#fff',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  listLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },


});