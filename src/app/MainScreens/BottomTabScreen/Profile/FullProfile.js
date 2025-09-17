import { View, Text, StyleSheet, ImageBackground, Dimensions, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Platform, ScrollView, RefreshControl, Button, Alert } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { UserGetProfileDetails, UserUpdatedProfileDetails, UserUpdatedProfilePic, UserUpdatedProfilePic123 } from '../../../../network/API_Calls'
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';




import NetInfo from '@react-native-community/netinfo';
import CustomTextInput from '../../../../components/UI/Inputs/CustomTextInput';

import { BASE_URL } from '../../../../Enviornment';
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar';
import Metrics from '../../../../utills/ResposivesUtils/Metrics';
import TextStyles from '../../../../components/UIConfig/TextStyles';
import { Image } from 'expo-image';
import LoaderComponents from '../../../../components/UI/Loadings/LoaderComponents';
import CustomButton1 from '../../../../components/UI/CustomButtons/CustomButton1';
import { Entypo } from '@expo/vector-icons';
import { CustomAlerts_LogOut } from '../../../../utills/CustomReuseAlerts';
import { logoutFunctions } from '../../../../utills/LogOut';


const Profile = () => {
  const [spinnerbool, setSpinnerbool] = useState(false)
  const [profile, setProfile] = useState("")
  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")
  const [UserPhone, setUserPhone] = useState("")
  const navigation = useNavigation();
  let tokenn = useSelector((state) => state.login.token);
  const [isConnected, setIsConnected] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'User Profile' // 👈 You can change this dynamically
    });
  }, [navigation]);


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    userData()
  }, []);


  const userData = async () => {
    setSpinnerbool(true)
    try {
      const res = await UserGetProfileDetails(tokenn)
      if (res) {
        console.log(res.data)
        setFirstName(res.data.username)
        setLastName(res.data.lastname)
        setUserPhone(res.data.phone_number)
      }
    } catch (error) {
      Alert.alert("")
    }
    finally {
      setSpinnerbool(false)
      setRefreshing(false);
    }
  }

  useEffect(() => {
    userData()
  }, []);

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);


  if (!isConnected) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
        <Text>No network found</Text>
        <Text>Please check your internet connection</Text>
        <Button title='go to Downloads' onPress={() => { navigation.navigate("Downloads") }}></Button>
      </View>
    );
  } else {
  }

  const LogOutAlert = async () => {
    CustomAlerts_LogOut(
      undefined, undefined,
      () => {
        logoutFunctions(dispatch)
      }
    )
  }



  return (
    <View style={{ flex: 1, }}>
      <CustomStatusBar barStyle="dark-content" backgroundColor="white" />

      <LoaderComponents
        visible={spinnerbool}
      />
      <ScrollView
        style={{
          width: '100%',
          flex: 1,
          backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20,
        }}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
            <View style={[{ width: Metrics.rfv(100), height: Metrics.rfv(100), justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: Metrics.rfv(60) }]}>
              <Image
                style={[{ width: Metrics.rfv(125), height: Metrics.rfv(125), elevation: 3 },]}
                source={require("../../../../../assets/icon.png")}
                contentFit="cover"
                transition={1000}
                alt=''
              />
            </View>
            <Text style={[TextStyles.STYLE_1_A30, { color: "rgba(3, 3, 112, 1)", }]}>Satya Sadhna</Text>
          </View>

          <View style={{ flex: 0.4, width: '100%', marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
            <CustomTextInput
              boxWidth={'90%'}
              placeholder={'Enter Your Name'}
              label={'Name'}
              name='first'
              value={FirstName}
              outlined
              editable={false}
              bgColor={'#e5e5e5'}
            />
            <CustomTextInput
              boxWidth={'90%'}
              placeholder={'Enter Your Name'}
              label={'Phone number'}
              name='first'
              value={UserPhone}
              editable={false}
              bgColor={'#e5e5e5'}
              outlined
            />
          </View>

          <View style={{ flex: 0.2, width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>

            <CustomButton1
              boxWidth={'86%'}

              onPress={() => {
                LogOutAlert()
              }}
              bgColor={'rgba(3, 3, 112, 1)'}
              textStyling={[{ color: "white" }]}
              style={{}}> Log out</CustomButton1>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({

  inputContainer: {
    marginBottom: 12,

  },

  input: {
    width: 300,
    // backgroundColor: "#121212",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 12,

    borderRadius: 6,
    marginBottom: 6,
    color: "white",
    height: 45,


  },
  TextUR: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '300',
    marginTop: 20
  },
  TextGS: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    marginTop: 20
  },

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
    width: 360,
    height: 360,
    overflow: 'hidden',
  },
  innerCircle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

