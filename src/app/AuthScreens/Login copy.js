import { Alert, ImageBackground, Keyboard, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import GlobalStyles from '../../components/UIConfig/GlobalStyles'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import { useFormik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import { useToast } from 'react-native-toast-notifications'

import { useDispatch } from 'react-redux'
// import { UserLoginApi } from '../../Network/ApiCalls'
import LoaderComponents from '../../components/UI/Loadings/LoaderComponents'
import CustomStatusBar from '../../components/UI/CustomStatusBar/CustomStatusBar'
import { SafeAreaView } from 'react-native-safe-area-context'


const LoginPage = () => {
  const dispatch = useDispatch()
  const toast = useToast()
  const navigation = useNavigation()
  const passwordRef = useRef(null);

  const [show, setShow] = useState("")

  const [refreshing, setRefreshing] = useState(false)
  const [spinnerbool, setSpinnerbool] = useState(false)
  const [errorFormAPI, seterrorFormAPI] = useState("")


  const onRefresh = () => {
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }




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
      // email: ZInitialValues?.login?.email || "",
      // password: ZInitialValues?.login?.password || "",
      // fcm_token: fcmPushToken || "",
      // platform: Platform.OS || ""

    },

    onSubmit: values => {
      {
        console.log("Output from formik", values)
        submitHandler(values)
      }
    },

    // validationSchema: LoginPageYupSchema,

    validate: values => {
      const errors = {};
      return errors;
    },

  });




  const submitHandler = async (values) => {

    // setSpinnerbool(true)
    // setShow({ password: false })
    // try {
    //   const res = await UserLoginApi(values);
    //   if (res.data) {
    //     const token = res.data.token
    //     // navigation.navigate("FlatSelecter", { token: token })

    //   }

    // } catch (error) {
    //   console.log("error Login API", error)
    // }
    // finally {
    //   setSpinnerbool(false)
    // }

  }




  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    // Listener for when the keyboard is shown
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );

    // Listener for when the keyboard is hidden
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Cleanup listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>

      <LoaderComponents
        visible={spinnerbool}
      // visible={true}

      />
      <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle}
        backgroundColor={GlobalStyles.AuthScreenStatusBar1.color}
        hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />


      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={refreshing}
      //     onRefresh={onRefresh}
      //   />
      // }
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            contentContainerStyle={{ flex: 1, }}
          >
            <View style={{ flex: 1, }}>
              {/* <ImageBackground
                source={require('../../assets/Backgrounds/Bg1.jpeg')}
                resizeMethod='cover'
                style={{ flex: 1 }}
              > */}
              <SafeAreaView style={{ flex: 1, }}>



              </SafeAreaView>

              {/* </ImageBackground> */}

            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </ScrollView>
      {/* </SafeAreaView> */}
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({})