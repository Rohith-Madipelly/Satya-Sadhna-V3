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
import { UserLoginApi } from '../../network/API_Calls'
import AsyncStorage_Calls from '../../utills/AsyncStorage_Calls'
import { setToken } from '../../redux/actions/AuthActions'
import { useDispatch, useSelector } from 'react-redux'
import HandleErrors from '../../utills/HandleErrors'
import { LoginPageYupSchema } from '../../FormikYupSchema/LoginPageYupSchema'
import { useNavigation } from '@react-navigation/native'




const Login = () => {
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
      emailorPhoneNumber: "",
      password: "",
      platform: Platform.OS || ""
    },
    onSubmit: values => {
      {
        submitHandler(values)
      }
    },
    validationSchema: LoginPageYupSchema,
    validate: values => {
      const errors = {};
      return errors;
    },

  });

  const submitHandler = async (values) => {
    setSpinnerbool(true)


    let loginFormData;
    if (/^\d+$/.test(values.emailorPhoneNumber)) {
      loginFormData = { phone_number: values.emailorPhoneNumber };
    } else {
      loginFormData = { email: values.emailorPhoneNumber };
    }
    loginFormData.password = values.password;

    try {
      const res = await UserLoginApi(loginFormData)
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
      console.log("error Login API", error.response.data)
      if (error.response) {
        if (error.response.status === 401) {
          seterrorFormAPI({ passwordForm: `${error.response.data?.message || error.response.data?.error}` })
        } else if (error.response.status === 404) {
          seterrorFormAPI({ emailorPhoneNumberForm: `${error.response.data?.message || error.response.data?.error}` })
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
    emailorPhoneNumber: useRef(null),
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
                          style={[{ width: Metrics.rfv(125), height: Metrics.rfv(125), elevation: 3 },]}
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
                      <Text style={[TextStyles.STYLE_2_A20, { color: "white", marginBottom: 15 }]}>Login</Text>





                      <CustomTextInput
                        boxWidth={'90%'}
                        label={"Email / Phone number"}
                        placeholder={'Enter email or phone number'}
                        bgColor={'white'}
                        // bgColor={'transparent'}
                        containerStyle={{ borderRadius: 10 }}
                        asterisksymbol={true}
                        inputRef={inputRefs?.emailorPhoneNumber}
                        labelStyle={{ color: 'white' }}
                        InputStyle={{ color: 'black' }}
                        placeholderTextColor={'#4C5664'}
                        name='age'
                        value={values?.emailorPhoneNumber}
                        onChangeText={(e) => {
                          handleChange("emailorPhoneNumber")(e);
                          seterrorFormAPI();
                        }}
                        onBlur={handleBlur("emailorPhoneNumber")}
                        validate={handleBlur("emailorPhoneNumber")}
                        keyboardType="email-address"
                        outlined
                        returnKeyType="next"
                        onSubmitEditing={() => inputRefs?.password.current?.focus()}
                        borderColor={`${(errors.emailorPhoneNumber && touched.emailorPhoneNumber) || (errorFormAPI && errorFormAPI.emailorPhoneNumberForm) ? borderColorErrorInput : borderColorInput}`}
                        errorMessage={`${(errors.emailorPhoneNumber && touched.emailorPhoneNumber) ? `${errors.emailorPhoneNumber}` : (errorFormAPI && errorFormAPI.emailorPhoneNumberForm) ? `${errorFormAPI.emailorPhoneNumberForm}` : ``}`}
                      />

                      <CustomTextInput
                        boxWidth={'90%'}
                        label={'Password'}
                        placeholder={'Please enter your password'}
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
                        returnKeyType="done"
                        onSubmitEditing={() => { handleSubmit() }}
                        borderColor={`${(errors.password && touched.password) || (errorFormAPI && errorFormAPI.passwordForm) ? borderColorErrorInput : borderColorInput}`}
                        errorMessage={`${(errors.password && touched.password) ? `${errors.password}` : (errorFormAPI && errorFormAPI.passwordForm) ? `${errorFormAPI.passwordForm}` : ``}`}
                      />



                      <View style={{
                        width: "90%",
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                        {true ? <TouchableOpacity onPress={() => { navigation.navigate("Register"); seterrorFormAPI() }} style={{}}>
                          <Text style={[{ color: 'white', fontWeight: 600 }]}>New User? Sign Up </Text></TouchableOpacity> : <View></View>}


                        <TouchableOpacity onPress={() => { navigation.navigate("Forgetpassword"); seterrorFormAPI() }} style={{}}>
                          <Text style={[{ color: 'white', fontWeight: 600, fontSize: 13 }]}>Forget Password?</Text></TouchableOpacity>
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
                          style={{}}><Entypo name="login" size={20} color="#283E71" /> Log in</CustomButton1>
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

export default Login

const styles = StyleSheet.create({})