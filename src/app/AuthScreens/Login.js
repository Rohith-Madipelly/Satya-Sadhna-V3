import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Dimensions } from 'react-native';


import {
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";

import { useEffect, useState } from 'react';
import { Formik } from "formik";


import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

// import { ErrorResPrinter } from '../../utils/ErrorResPrinter.js';
import NetInfo from '@react-native-community/netinfo';
// import { ToasterSender } from '../../utils/Toasters/Toaster.js';
import {UserLoginApi} from '../../network/API_Calls.js'


import AuthComponent from '../../componentsOld/AuthComponent.js';
import CustomButton from '../../componentsOld/ButtonC1.js';
import CustomTextInputOld from '../../componentsOld/CustomTextInputOld.js';
import AsyncStorage_Calls from '../../utills/AsyncStorage_Calls.js';
import { setToken } from '../../redux/actions/AuthActions.js';
import { loginSchema } from '../../fomik/schema/loginSchema.js';



export default function Login() {

  const [show, setShow] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [isConnected, setIsConnected] = useState(true);
  const navigation = useNavigation();

  const dispatch = useDispatch();


  function onchange(text, field) {
    setValues({ ...values, [field]: text });
  }

  const submitHandler = async (user) => {

    seterrorFormAPI()
    try {
      const { emailorPhoneNumber, password } = user;

      let loginFormData;

      console.log("sca", emailorPhoneNumber)

      if (/^\d+$/.test(emailorPhoneNumber)) {
        loginFormData = { phone_number: emailorPhoneNumber };
      } else {
        loginFormData = { email: emailorPhoneNumber };
      }
      loginFormData.password = password;



      setSpinnerbool(true)
      const res = await UserLoginApi(loginFormData)
      if (res) {
        console.log(res.data)
        const Message = res.data.message
        const token = res.data.token

        await AsyncStorage_Calls.setAsyncValue("Token", JSON.stringify(token), function (res, status) {
          if (status) {
            setTimeout(() => {
              // ToasterSender({ Message: `${Message}` })
              dispatch(setToken(token));
            }, 500);
          }
        })

        setTimeout(() => {
          setSpinnerbool(false)
        }, 50);

      }


    } catch (error) {

      // console.log(error.response.data.message,error.response.data,"data<",error.response)
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.")
        }
        else if (error.response.status === 401) {
          seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
        }
        else if (error.response.status === 404) {
          seterrorFormAPI({ emailorPhoneNumberForm: `${error.response.data.message}` })
        }

        else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message)
        }
        else {
          console.log("An error occurred response.>>",error.message)
          // ErrorResPrinter(`${error.message}`)
        }
      }
      else if (error.request) {
        console.log("No Response Received From the Server.")

        if (error.request.status === 0) {
          // console.log("error in request ",error.request.status)
          Alert.alert("No Network Found", "Please Check your Internet Connection")
        }

      }
      else {
        console.log("Error in Setting up the Request.")
      }

      setSpinnerbool(false)

      if (error) {
      }
    }
    finally {
      setSpinnerbool(false)
    }
  }
  // if (!isConnected) {
  // Alert.alert("Your Device is currently Offline and not connected to the internet")
  // return(<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 150 }} >
  //       <Text>No network found</Text>
  //       <Text>Please check your internet connection</Text>
  //       <Button title='go to Downloads' onPress={() => { navigation.navigate("Downloads") }}></Button>
  //     </View>)
  // }

  const { width, height } = Dimensions.get('screen')
  console.log(height)
  return (
    <>



      <AuthComponent NameUnderLogo={"Satya Sadhna"} titleUnder={""} screenName={"LOGIN"}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={5000}
        >
          {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}

          {isConnected ? <ScrollView style={{ height: height, }}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Formik
                // enableReinitialize
                validateOnMount={true}
                // initialValues={{ email: "madipellyrohith@gmail.com", password: "Rohith@7" }}
                initialValues={{ emailorPhoneNumber: "", password: "" }}
                onSubmit={submitHandler}
                validator={() => ({})}
              validationSchema={loginSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  values,
                  touched,
                  errors,
                  isValid,
                  resetForm,
                }) => (
                  <>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>


                      <View style={{ height: height > 1000 ? height * 0.1 : height * 0.035 }}>


                      </View>
                      <CustomTextInputOld
                        boxWidth={'80%'}
                        placeholder={'Enter Email or Phone Number'}
                        label={'Email or Phone Number'}
                        name='email'
                        value={values.emailorPhoneNumber}
                        leftIcon={<FontAwesome name="user" size={20} color="black" />}
                        // bgColor='#e1f3f8'
                        // bgColor="#B1B1B0"

                        onChangeText={(e) => { const eToLowerCaseText = e.toLowerCase(); handleChange("emailorPhoneNumber")(eToLowerCaseText); seterrorFormAPI(); }}
                        onBlur={handleBlur("emailorPhoneNumber")}

                        // validate={() => {
                        //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                        //     else { setError({ ...error, first: null }) }
                        // }}

                        validate={handleBlur("emailorPhoneNumber")}

                        outlined

                        borderColor={`${(errors.emailorPhoneNumber && touched.emailorPhoneNumber) || (errorFormAPI && errorFormAPI.emailorPhoneNumberForm) ? "red" : "#ccc"}`}

                        errorMessage={`${(errors.emailorPhoneNumber && touched.emailorPhoneNumber) ? `${errors.emailorPhoneNumber}` : (errorFormAPI && errorFormAPI.emailorPhoneNumberForm) ? `${errorFormAPI.emailorPhoneNumberForm}` : ``}`}

                      // errorColor='magenta'
                      />

                      <View style={{ height: height * 0.01 }}>

                      </View>

                      <CustomTextInputOld
                        boxWidth={'80%'}
                        placeholder={'Enter Password'}
                        label={'Password'}
                        name='Password'
                        value={values.password}
                        leftIcon={<Entypo name="lock" size={20} color="black" />}
                        onBlur={handleBlur("password")}

                        onChangeText={(e) => {
                          const trimmedValue = e.trim();
                          handleChange("password")(trimmedValue);
                          seterrorFormAPI();
                        }}


                        rightIcon={<Pressable onPress={() => setShow({ ...setShow, password: !show?.password })}>

                          {!show?.password ? (
                            <Entypo name="eye-with-line" size={20} color="black" />) : (

                            <Entypo name="eye" size={20} color="black" />)
                          }

                        </Pressable>
                        }

                        secure={!show?.password} //default to true
                        validate={handleBlur("password")}
                        borderColor={`${(errors.password && touched.password) || (errorFormAPI && errorFormAPI.PasswordForm) ? "red" : "#ccc"}`}
                        errorMessage={`${(errors.password && touched.password) ? `${errors.password}` : (errorFormAPI && errorFormAPI.PasswordForm) ? `${errorFormAPI.PasswordForm}` : ``}`}
                        // errorColor='magenta'
                        outlined
                      />
                      <View style={{ height: height * 0.01, }}>

                      </View>

                      <CustomButton
                        onPress={() => {
                          setShow({ ...setShow, password: false });
                          handleSubmit()
                        }}
                        leftIcon={<Entypo style={styles.icon} name={'login'} size={18} color={'white'} />}
                        bgColor={`${!isValid ? "rgba(3, 3, 112, 1)" : "rgba(3, 3, 112, 1)"}`}

                        style={{ marginTop: 50 }}>
                        Login
                      </CustomButton>



                      <View style={{}}>
                        <TouchableOpacity onPress={() => { navigation.navigate("ForgotPasswordEmail"); seterrorFormAPI(""); resetForm() }}>
                          <Text style={[styles.paragraphy, { color: 'white', marginTop: 20, fontWeight: '400', fontSize: 15 }]}>Forgot password?</Text>
                        </TouchableOpacity>
                      </View>


                      <View style={{ width: '65%', textAlign: 'center', marginTop: 40 }}>
                        <TouchableOpacity onPress={() => { navigation.navigate("Register"); resetForm() }}>
                          <Text style={[styles.paragraphy, { textAlign: 'center', color: 'white', fontWeight: '400', fontSize: 15 }]}>Don’t have an account? <Text style={[styles.underline, { color: '#006AFF', marginLeft: 10 }]}> Sign Up</Text>
                          </Text>

                        </TouchableOpacity>
                      </View>
                    </View>
                  </>

                )}


              </Formik>
            </View>
          </ScrollView> : <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text>No network found</Text>
            <Text>Please check your internet connection</Text>
          </View>}
          {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
      </AuthComponent>


    </>
  );

}

const styles = StyleSheet.create({


  paragraphy: {
    // fontFamily: 'Jost',
    fontSize: 14,
    fontWeight: '300',
  },
  underline: {
    textDecorationLine: 'underline',
  }

})