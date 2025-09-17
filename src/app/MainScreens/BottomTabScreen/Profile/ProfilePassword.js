import { View, Text, StyleSheet, ImageBackground, Dimensions, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Platform, ScrollView, RefreshControl, Button, Alert, Pressable } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
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
import { useToast } from 'react-native-toast-notifications';
import { useFormik } from 'formik';
import { ForgetSetPageYupSchema } from '../../../../FormikYupSchema/ForgetSetPageYupSchema';


const ProfilePassword = ({ route }) => {
    const [refreshing, setRefreshing] = useState(false);

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
            setRefreshing(true)
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

    const onRefresh = () => {
        setRefreshing(true)
    }


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
                        label={'New Password'}
                        placeholder={'Please enter your new password'}
                        bgColor={'white'}
                        // bgColor={'transparent'}
                        asterisksymbol={true}
                        inputRef={inputRefs?.password}
                            labelStyle={{ color: '#4C5664' }}
                            InputStyle={{ color: '#4C5664' }}
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
                            labelStyle={{ color: '#4C5664' }}
                            InputStyle={{ color: '#4C5664' }}
                            placeholderTextColor={'#4C5664'}
                            boxWidth={'90%'}
                            label={'Re-Enter New Password'}
                            placeholder={'Please Re-enter your password'}
                            bgColor={'white'}
                            // bgColor={'transparent'}
                            asterisksymbol={true}
                            inputRef={inputRefs?.password_confirmation}
                            name='password_confirmation'
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
                    </View>

                    <View style={{ flex: 0.2, width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>

                        <CustomButton1
                            boxWidth={'86%'}

                            onPress={() => {
                                LogOutAlert()
                            }}
                            bgColor={'rgba(3, 3, 112, 1)'}
                            textStyling={[{ color: "white" }]}
                            style={{}}> Change Password</CustomButton1>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ProfilePassword

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

