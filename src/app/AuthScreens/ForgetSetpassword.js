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
import { ForgotApiPassRest, UserForgotOTPApi } from '../../network/API_Calls'
import { useDispatch, useSelector } from 'react-redux'
import HandleErrors from '../../utills/HandleErrors'
import { useNavigation } from '@react-navigation/native'
import { ForgetPageYupSchema } from '../../FormikYupSchema/ForgetPageYupSchema'
import { ForgetSetPageYupSchema } from '../../FormikYupSchema/ForgetSetPageYupSchema'





const ForgetSetpassword = ({ route }) => {
  const { params } = route;
  const paramsEmail = params?.email || 'madipellyrohith@gmail.com';


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
      email: paramsEmail ? paramsEmail : "",
      password: "",
      password_confirmation: ""
    },
    onSubmit: values => {
      {
        console.log("mhgjhvgj")
        submitHandler(values)
      }
    },
    validationSchema: ForgetSetPageYupSchema,
    validate: values => {
      const errors = {};
      return errors;
    },

  });

  const submitHandler = async (values) => {
    setSpinnerbool(true)
    try {
      const res = await ForgotApiPassRest(values)
      if (res.data) {
        console.log("res", res.data)

        toast.show("Password updated successfully!")
        navigation.navigate("Login", { email: values.email })

        setTimeout(() => {
          resetForm()
        }, 200);
      }
    } catch (error) {
      console.log("error Login API", error.response.data, "????", error.response.status)
      if (error.response) {
        if (error.response.status === 401) {
          seterrorFormAPI({ passwordForm: `${error.response.data?.message || error.response.data?.error}` })
        }
        else if (error.response.status === 404) {
          seterrorFormAPI({ emailForm: `${error.response.data?.message || error.response.data?.error}` })
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
    password_confirmation: useRef(null),
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
                      <Text style={[TextStyles.STYLE_2_A20, { color: "white", marginBottom: 15 }]}>Set Password</Text>





                      <CustomTextInput
                        boxWidth={'90%'}
                        label={'New Password'}
                        placeholder={'Please enter your new password'}
                        bgColor={'white'}
                        // bgColor={'transparent'}
                        asterisksymbol={true}
                        inputRef={inputRefs?.password}
                        labelStyle={{ color: 'white' }}
                        InputStyle={{ color: 'black' }}
                        placeholderTextColor={'#4C5664'}
                        name='age'
                        value={values?.password}
                        secure={!show?.password}
                        containerStyle={{ borderRadius: 10 }}
                        rightIcon={<Pressable onPress={() => setShow({ ...setShow, password: !show?.password })}>
                          {!show?.password ? (
                            <Entypo name="eye-with-line" size={20} color="black" />) : (
                            <Entypo name="eye" size={20} color="black" />)
                          }
                        </Pressable>
                        }
                        onChangeText={(e) => {
                          handleChange("password")(e);
                          seterrorFormAPI();
                        }}
                        onBlur={handleBlur("password")}
                        validate={handleBlur("password")}
                        outlined
                        returnKeyType="next"
                        borderColor={`${(errors.password && touched.password) || (errorFormAPI && errorFormAPI.passwordForm) ? borderColorErrorInput : borderColorInput}`}
                        errorMessage={`${(errors.password && touched.password) ? `${errors.password}` : (errorFormAPI && errorFormAPI.passwordForm) ? `${errorFormAPI.passwordForm}` : ``}`}
                      />



                      <CustomTextInput
                        boxWidth={'90%'}
                        label={'Re-Enter New Password'}
                        placeholder={'Please Re-enter your password'}
                        bgColor={'white'}
                        // bgColor={'transparent'}
                        asterisksymbol={true}
                        inputRef={inputRefs?.password_confirmation}
                        labelStyle={{ color: 'white' }}
                        InputStyle={{ color: 'black' }}
                        placeholderTextColor={'#4C5664'}
                        name='age'
                        value={values?.password_confirmation}
                        secure={!show?.password_confirmation}
                        containerStyle={{ borderRadius: 10 }}
                        rightIcon={<Pressable onPress={() => setShow({ ...setShow, password_confirmation: !show?.password_confirmation })}>
                          {!show?.password_confirmation ? (
                            <Entypo name="eye-with-line" size={20} color="black" />) : (
                            <Entypo name="eye" size={20} color="black" />)
                          }
                        </Pressable>
                        }
                        onChangeText={(e) => {
                          handleChange("password_confirmation")(e);
                          seterrorFormAPI();
                        }}
                        onBlur={handleBlur("password_confirmation")}
                        validate={handleBlur("password_confirmation")}
                        outlined
                        returnKeyType="next"
                        borderColor={`${(errors.password_confirmation && touched.password_confirmation) || (errorFormAPI && errorFormAPI.password_confirmationForm) ? borderColorErrorInput : borderColorInput}`}
                        errorMessage={`${(errors.password_confirmation && touched.password_confirmation) ? `${errors.password_confirmation}` : (errorFormAPI && errorFormAPI.password_confirmationForm) ? `${errorFormAPI.password_confirmationForm}` : ``}`}
                      />



                      <View style={{
                        width: "90%",
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                        {true ? <TouchableOpacity onPress={() => { navigation.navigate("Login"); seterrorFormAPI() }} style={{}}>
                          <Text style={[{ color: 'white', fontWeight: 600 }]}>Back to login</Text></TouchableOpacity> : <View></View>}


                        <TouchableOpacity onPress={() => { navigation.navigate("Forget Password"); seterrorFormAPI() }} style={{}} disabled>
                          {/* <Text style={[{ color: 'white', fontWeight: 600, fontSize: 13 }]}>Forget Password?</Text> */}
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
                          style={{}}>Save</CustomButton1>
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

export default ForgetSetpassword

const styles = StyleSheet.create({})