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
import { signUpSchema } from '../../fomik/schema/signUpSchema'
import { Entypo } from '@expo/vector-icons'
import CustomButton1 from '../../components/UI/CustomButtons/CustomButton1'
import TextStyles from '../../components/UIConfig/TextStyles'
import { useToast } from 'react-native-toast-notifications'
import { UserLoginApi, UserRegisterApi } from '../../network/API_Calls'
import { useDispatch, useSelector } from 'react-redux'
import HandleErrors from '../../utills/HandleErrors'
import { SignPageYupSchema } from '../../FormikYupSchema/SignPageYupSchema'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage_Calls from '../../utills/AsyncStorage_Calls'
import { setToken } from '../../redux/actions/AuthActions'




const Register = () => {
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
      username: "",
      phone_number: "",
      email: "",
      password: "",
    },
    onSubmit: values => {
      {
        submitHandler(values)
      }
    },
    validationSchema: SignPageYupSchema,
    validate: values => {
      const errors = {};
      return errors;
    },

  });

  const submitHandler = async (values) => {
    setSpinnerbool(true)
    try {
      const res = await UserRegisterApi(values)
      if (res.data) {
        const token = res.data.token
        toast.show(res.data.message)

        await AsyncStorage_Calls.setAsyncValue("Token", JSON.stringify(token), function (res, status) {
          if (status) {
            setTimeout(() => {
              dispatch(setToken(token));
            }, 500);
          }
        })
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
                      alignItems: 'center'
                    }}>
                      <Text style={[TextStyles.STYLE_2_A20, { color: "white", marginBottom: 15 }]}>Sign Up</Text>



                      <CustomTextInput
                        boxWidth={'90%'}
                        label={'Name'}
                        placeholder={'Please enter your name'}
                        bgColor={'white'}
                        asterisksymbol={true}
                        inputRef={inputRefs?.username}
                        labelStyle={{ color: 'white' }}
                        InputStyle={{ color: 'black' }}
                        placeholderTextColor={'#4C5664'}
                        name='username'
                        value={values?.username}
                        containerStyle={{ borderRadius: 10 }}
                        onChangeText={(e) => {
                          handleChange("username")(e);
                          seterrorFormAPI();
                        }}
                        onBlur={handleBlur("username")}
                        validate={handleBlur("username")}
                        outlined
                        returnKeyType="next"
                        borderColor={`${(errors.username && touched.username) || (errorFormAPI && errorFormAPI.usernameForm) ? borderColorErrorInput : borderColorInput}`}
                        errorMessage={`${(errors.username && touched.username) ? `${errors.username}` : (errorFormAPI && errorFormAPI.usernameForm) ? `${errorFormAPI.usernameForm}` : ``}`}
                      />

                      <CustomTextInput
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
                      />

                      <CustomTextInput
                        boxWidth={'90%'}
                        label={"Phone Number"}
                        placeholder={'Enter phone number'}
                        bgColor={'white'}
                        containerStyle={{ borderRadius: 10 }}
                        asterisksymbol={true}
                        inputRef={inputRefs?.phone_number}
                        labelStyle={{ color: 'white' }}
                        InputStyle={{ color: 'black' }}
                        placeholderTextColor={'#4C5664'}
                        name='phone_number'
                        value={values?.phone_number}
                        onChangeText={(e) => {
                          handleChange("phone_number")(e);
                          seterrorFormAPI();
                        }}
                        maxLength={10}
                        onBlur={handleBlur("phone_number")}
                        validate={handleBlur("phone_number")}
                        keyboardType="email-address"
                        outlined
                        returnKeyType="next"
                        onSubmitEditing={() => inputRefs?.password.current?.focus()}
                        borderColor={`${(errors.phone_number && touched.phone_number) || (errorFormAPI && errorFormAPI.phone_numberForm) ? borderColorErrorInput : borderColorInput}`}
                        errorMessage={`${(errors.phone_number && touched.phone_number) ? `${errors.phone_number}` : (errorFormAPI && errorFormAPI.phone_numberForm) ? `${errorFormAPI.phone_numberForm}` : ``}`}
                      />
                      <CustomTextInput
                        boxWidth={'90%'}
                        label={'Password'}
                        placeholder={'Please enter your password'}
                        bgColor={'white'}
                        asterisksymbol={true}
                        inputRef={inputRefs?.password}
                        labelStyle={{ color: 'white' }}
                        InputStyle={{ color: 'black' }}
                        placeholderTextColor={'#4C5664'}
                        name='password'
                        value={values?.password}
                        containerStyle={{ borderRadius: 10 }}
                        rightIcon={<Pressable onPress={() => setShow({ ...setShow, password: !show?.password })}>
                          {!show?.password ? (
                            <Entypo name="eye-with-line" size={20} color="black" />) : (
                            <Entypo name="eye" size={20} color="black" />)
                          }
                        </Pressable>
                        }
                        secure={!show?.password}
                        onChangeText={(e) => {
                          handleChange("password")(e);
                          seterrorFormAPI();
                        }}
                        onBlur={handleBlur("password")}
                        validate={handleBlur("password")}
                        outlined
                        // returnKeyType="next"
                        onSubmitEditing={() => { handleSubmit() }}
                        borderColor={`${(errors.password && touched.password) || (errorFormAPI && errorFormAPI.passwordForm) ? borderColorErrorInput : borderColorInput}`}
                        errorMessage={`${(errors.password && touched.password) ? `${errors.password}` : (errorFormAPI && errorFormAPI.passwordForm) ? `${errorFormAPI.passwordForm}` : ``}`}
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
                          style={{}}><Entypo name="login" size={20} color="#283E71" /> Sign Up</CustomButton1>
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

export default Register

const styles = StyleSheet.create({})