import { Alert, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar'
import LoaderComponents from '../../../../components/UI/Loadings/LoaderComponents';
import { MaterialIcons } from '@expo/vector-icons';
import { CustomLinking } from '../../../../utills/CustomLinking';
import { SERVICE_PROVIDER_WEBSITE } from '../../../../Enviornment';
import { Image, ImageBackground } from 'expo-image';
import { useDispatch, useSelector } from 'react-redux';
import { UserGetProfileDetails } from '../../../../network/API_Calls';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  let tokenn = useSelector((state) => state.login.token);

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


  const ProfileLinksx = [
    {
      name: "Profile",
      onPress: () => { navigation.navigate("MyProfile") },
      IconImage: require("../../../../assets/Image/ProfileLogos/account-circle-outline.png")
      // isDisplay: true
    },
    {
      name: "Password",
      onPress: () => { navigation.navigate("MyFamilyMembers") },
      IconImage: require("../../../../assets/Image/ProfileLogos/lock-outline.png")
      // isDisplay: hasAPIPermission("", "feature.familymember"),
    },
    {
      name: "Register for course",
      onPress: () => { navigation.navigate("MyVehicles") },
      IconImage: require("../../../../assets/Image/ProfileLogos/eidt.png"),
      // isDisplay: hasAPIPermission("", "feature.vehicle"),
    }]

  const ProfileLinks2 = [
    {
      name: "About Satya Sadhna",
      onPress: () => { navigation.navigate("ChangePassword") },
      IconImage: require("../../../../assets/Image/ProfileLogos/alert-circle-outline.png"),
      isDisplay: true
    },
    {
      name: "Know About Guruji",
      onPress: () => { navigation.navigate("ChangePassword") },
      IconImage: require("../../../../assets/Image/ProfileLogos/alert-circle-outline.png"),
      isDisplay: true
    },
    {
      name: "Privacy Policy",
      onPress: () => { navigation.navigate("ChangePassword") },
      IconImage: require("../../../../assets/Image/ProfileLogos/account-lock-outline.png"),
      isDisplay: true
    },
    {
      name: "Delete Account Policy",
      onPress: () => { navigation.navigate("ChangePassword") },
      IconImage: require("../../../../assets/Image/ProfileLogos/trash.png"),
      isDisplay: true
    },
    {
      name: "Log out",
      onPress: () => { navigation.navigate("ChangePassword") },
      IconImage: require("../../../../assets/Image/ProfileLogos/trash.png"),
      isDisplay: true
    },
  ]
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomStatusBar barStyle="dark-content" backgroundColor="white" />

      <LoaderComponents
        visible={spinnerbool}
      />

      <ScrollView style={[{
        flex: 1,
        backgroundColor: "#FFF"
      }]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("FullProfile") }}>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

            <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

              <View>
                <View style={styles.outerCircle}>
                  <ImageBackground
                    style={styles.innerCircle}
                    source={require("../../../../assets/Image/profile.png")}
                    onError={(error) => Alert.alert("Error in ", error)}

                  >
                    <Text style={styles.letter}>{StartingLetter?.toLocaleUpperCase()}</Text>
                  </ImageBackground>
                </View>
                {/* }  */}
              </View>

              <View style={{ margin: 5, marginLeft: 14 }}>
                <Text>{UserName}</Text>
                <Text>Show profile</Text>
              </View>


            </View>

            <View style={{ marginTop: 10 }}>


            </View>

          </View>
        </TouchableOpacity>

        <View>
          <Text style={[styles.Heading_u2, { marginBottom: 28 }]}>More</Text>
          <View>
            {ProfileLinksx.map((item, index) => {
              return (
                <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }} key={index}>
                  <View>
                    <Image style={{ width: 24, height: 24, }}
                      source={item.IconImage}
                    />
                  </View>
                  <Text style={[styles.Heading_u3, { marginTop: 2 }]}>{item.name}</Text>
                </View>
              )
            })}
          </View>
        </View>


        <View style={{ marginRight: 10, marginVertical: 5 }}>
          <Text style={{ color: '#001F2099', textAlign: 'center' }}>
            Version 2.2.0</Text>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => {
            CustomLinking(SERVICE_PROVIDER_WEBSITE)
          }}>
            <MaterialIcons name="copyright" size={15} />
            <Text style={{
              fontWeight: '600', textAlign: 'center', marginVertical: 10, marginLeft: 5, fontSize: 15
            }}>
              Analogue IT Solutions
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  Heading_1: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '400',
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



  outerCircle: {
    width: 50,
    height: 50,
    borderRadius: 75,
    overflow: 'hidden', // Ensure inner content doesn't overflow
  },
  innerCircle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    fontSize: 24,
    color: '#fff', // Change the text color as needed
  },

});