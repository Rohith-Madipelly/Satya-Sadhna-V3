import { Alert, Keyboard, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Metrics from '../../utills/ResposivesUtils/Metrics'
import { Image, ImageBackground } from 'expo-image'
import LoaderComponents from '../../components/UI/Loadings/LoaderComponents'
import CustomStatusBar from '../../components/UI/CustomStatusBar/CustomStatusBar'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LinearGradient } from 'expo-linear-gradient'
import { LEFT_AND_RIGHT_PADDING } from '../../components/UIConfig/AppContants'
import CustomTextInput from '../../components/UI/Inputs/CustomTextInput'
import { useFormik } from 'formik'
import { Entypo } from '@expo/vector-icons'
import CustomButton1 from '../../components/UI/CustomButtons/CustomButton1'
import TextStyles from '../../components/UIConfig/TextStyles'
import { useToast } from 'react-native-toast-notifications'
import { UserForgotOTPApi, UserVerifyOtp } from '../../network/API_Calls'
import { useDispatch, useSelector } from 'react-redux'
import HandleErrors from '../../utills/HandleErrors'
import { ForgetOtpYupSchema } from '../../FormikYupSchema/ForgetOtpYupSchema'
import { useNavigation } from '@react-navigation/native'
import CustomOtpInput6 from '../../components/UI/Inputs/CustomOtpInput6'





const VerifyForgetOTP = ({ route }) => {
  const { params } = route;
  const paramsEmail = params?.email || 'madipellyrohith@gmail.com';


  const [clearOtp, setClearOtp] = useState(false);
  const [spinnerbool, setSpinnerbool] = useState(false)
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [show, setShow] = useState("")
  const toast = useToast()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const isConnected = useSelector((state) => state.ApiDataRedux.isConnected)
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    values,
    touched,
    errors,
    setErrors,
    isValid,
    setValues,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      email: paramsEmail,
      userOtp: ""
    },
    onSubmit: values => {
      {
        submitHandler(values)
      }
    },
    validationSchema: ForgetOtpYupSchema,
    validate: values => {
      const errors = {};
      return errors;
    },

  });

  const submitHandler = async (values) => {
    console.log("lll", values)
    setSpinnerbool(true)
    try {
      const res = await UserVerifyOtp(values)
      if (res.data) {
        console.log("res", res.data)

        toast.show(res.data.message)
        navigation.navigate("ForgetSetpassword", { email: values.email })

        setTimeout(() => {
          // resetForm()
          setTimeout(() => setClearOtp(false), 500);
        }, 200);
      }
    } catch (error) {
      console.log("error Login API", error.response.data, "????", error.response.status)
      if (error.response) {
        if (error.response.status === 401) {
          seterrorFormAPI({ userOtp: `${error.response.data?.message || error.response.data?.error}` })
        }
        else if (error.response.status === 403) {
          seterrorFormAPI({ userOtp: `${error.response.data?.message || error.response.data?.error}` })
        }

        else {
          Alert.alert("Error", error.response.data?.error)
        }
      }
      else {
        HandleErrors(error, navigation, dispatch)
      }
    } finally {
      setSpinnerbool(false)
    }

  }

  const resendOTP = async () => {
    setClearOtp(true);
    setTimeout(() => setClearOtp(false), 500);
    setSpinnerbool(true)
    try {
      const res = await UserForgotOTPApi({ email: paramsEmail })
      if (res.data) {
        toast.show("Now, set your new password to secure your account.")
        setClearOtp(true);
        setTimeout(() => setClearOtp(false), 500);
      }
    } catch (error) {
      console.log("error Login API", error.response.data, "????", error.response.status)
      if (error.response) {
        if (error.response.status === 401) {
          seterrorFormAPI({ passwordForm: `${error.response.data?.message || error.response.data?.error}` })
        }
        else if (error.response.status === 409) {
          seterrorFormAPI({ phone_numberForm: `${error.response.data?.message || error.response.data?.error}` })
        }
        else if (error.response.status === 408) {
          seterrorFormAPI({ phone_numberForm: `${error.response.data?.message || error.response.data?.error}` })
        }
        else {
          Alert.alert("Error", error.response.data?.error)
        }
      }
      else {
        HandleErrors(error, navigation, dispatch)
      }
    } finally {
      setSpinnerbool(false)
    }

  }

  const inputRefs = {
    username: useRef(null),
    phone_number: useRef(null),
    email: useRef(null),
    password: useRef(null),
  };

  const borderColorInput = "#ccc"
  const borderColorErrorInput = "red"



  useEffect(() => {
    if (!isConnected) {
      toast.hideAll()
      toast.show("No Internet")
    }
  }, [])


  return (
    <View style={{
      flex: 1,
      backgroundColor: "white"
      // backgroundColor: GlobalStyles.AuthScreenStatusBar1.color
    }}>

      <CustomStatusBar barStyle="light"
        // backgroundColor="white"
        backgroundColor={"rgba(3, 9, 112, 0.9)"}
      />
      <LoaderComponents
        visible={spinnerbool}
      // visible={true}
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            contentContainerStyle={{ flex: 1, }}
          >
            <View style={{ flex: 1, }}>

              <ImageBackground
                // source={require('../../../assets/icon.png')}
                source={require('../../assets/Image/NEw/Black and White Mandala Design.png')}
                resizeMethod='cover'
                style={{ flex: 1 }}
              >
                <LinearGradient
                  colors={['rgba(3, 3, 112, 0.9)', 'rgba(3, 3, 120, 0.8)', 'rgba(3, 3, 112, 0.8)']}
                  style={{ flex: 1, }}
                >
                  <SafeAreaView style={{ flex: 1, }}>
                    <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                      <View style={[{ width: Metrics.rfv(100), height: Metrics.rfv(100), justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: Metrics.rfv(60) }]}>
                        <Image
                          style={[{ width: Metrics.rfv(125), height: Metrics.rfv(125), elevation: 3 }]}
                          source={require("../../../assets/icon.png")}
                          contentFit="cover"
                          transition={1000}
                          alt=''
                        />
                      </View>
                      <Text style={[TextStyles.STYLE_1_A30, { color: "white", }]}>Satya Sadhna</Text>
                    </View>
                    <View style={{
                      flex: 0.5,
                      paddingHorizontal: LEFT_AND_RIGHT_PADDING,
                      alignItems: 'center',
                    }}>
                      <Text style={[TextStyles.STYLE_2_A20, { color: "white", marginBottom: 15 }]}>Verify OTP</Text>
                      <Text style={[TextStyles.STYLE_2_A20, { color: "white", marginBottom: 15, fontSize: 14, width: "80%", textAlign: 'center' }]}>Enter the 6-digit code sent to your email to verify your account.</Text>



                      {/* <CustomTextInput
                        boxWidth={'90%'}
                        label={"Email"}
                        placeholder={'Enter email'}
                        bgColor={'white'}
                        containerStyle={{ borderRadius: 10 }}
                        asterisksymbol={true}
                        inputRef={inputRefs?.email}
                        labelStyle={{ color: 'white' }}
                        InputStyle={{ color: 'black' }}
                        placeholderTextColor={'#4C5664'}
                        name='email'
                        value={values?.email}
                        onChangeText={(e) => {
                          handleChange("email")(e);
                          seterrorFormAPI();
                        }}
                        onBlur={handleBlur("email")}
                        validate={handleBlur("email")}
                        keyboardType="email-address"
                        outlined
                        returnKeyType="next"
                        onSubmitEditing={() => inputRefs?.phone_number.current?.focus()}
                        borderColor={`${(errors.email && touched.email) || (errorFormAPI && errorFormAPI.emailForm) ? borderColorErrorInput : borderColorInput}`}
                        errorMessage={`${(errors.email && touched.email) ? `${errors.email}` : (errorFormAPI && errorFormAPI.emailForm) ? `${errorFormAPI.emailForm}` : ``}`}
                      /> */}

                      <View style={{
                        width: "90%",
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                        {false ? <TouchableOpacity onPress={() => { navigation.navigate("Login"); seterrorFormAPI() }} style={{}}>
                          <Text style={[{ color: 'white', fontWeight: 600, fontSize: 13 }]}>Back to login</Text></TouchableOpacity> : <View></View>}


                        <TouchableOpacity onPress={() => {
                          setClearOtp(true);
                          setTimeout(() => setClearOtp(false), 500);
                          seterrorFormAPI()
                        }} style={{}} >
                          <Text style={[{ color: 'white', fontWeight: 600, fontSize: 13 }]}>Clear</Text>
                        </TouchableOpacity>
                      </View>
                      <CustomOtpInput6
                        value={values.otp}
                        length={6}
                        keyboardType="number-pad"
                        onOtpSubmit={(otp) => {
                          seterrorFormAPI()
                          handleChange("userOtp")(otp)
                        }}
                        onChangeText={(index, value) => {
                          // console.log("index", index, ">value", value)
                        }}
                        errorMessage={`${(errors.userOtp && touched.userOtp) ? `${errors.userOtp}` : (errorFormAPI && errorFormAPI.userOtp) ? `${errorFormAPI.userOtp}` : ``}`}
                        errorBoxid={errorFormAPI ? [0, 1, 2, 3, 4, 5] : ""}
                        onClear={clearOtp}
                      />



                      <View style={{
                        width: "90%",
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                        {true ? <TouchableOpacity onPress={() => { navigation.navigate("Login"); seterrorFormAPI() }} style={{}}>
                          <Text style={[{ color: 'white', fontWeight: 600, fontSize: 13 }]}>Back to login</Text></TouchableOpacity> : <View></View>}


                        <TouchableOpacity onPress={() => { resendOTP(); seterrorFormAPI() }} style={{}} >
                          <Text style={[{ color: 'white', fontWeight: 600, fontSize: 13 }]}>Resend otp</Text>
                        </TouchableOpacity>
                      </View>



                      <View style={{
                        marginTop: Metrics.rfv(30)
                      }}>
                        <CustomButton1
                          boxWidth={'86%'}
                          styleData={{ backgroundColor: 'white' }}
                          onPress={() => {
                            handleSubmit()
                          }}
                          textStyling={[{ color: "#283E71" }]}
                          isLoading={spinnerbool}
                          style={{}}><Entypo name="login" size={20} color="#283E71" /> Verify otp</CustomButton1>
                      </View>
                    </View>
                  </SafeAreaView>


                </LinearGradient>
              </ImageBackground>
            </View>


          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  )
}

export default VerifyForgetOTP

const styles = StyleSheet.create({})