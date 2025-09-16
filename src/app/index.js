import { StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CustomFallback from './OtherScreens/CustomFallback'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ErrorBoundary from 'react-native-error-boundary'
import * as SplashScreen from 'expo-splash-screen' // Added missing import
import { useFonts } from 'expo-font'
import { useDispatch, useSelector } from 'react-redux'

// Auth Screens Imports
import Login from './AuthScreens/Login'
import BottomTabScreen from './MainScreens/BottomTabScreen'

// Music Screens
import TracksAudios from './MainScreens/Music/TracksAudios'
import TracksListByCategory from './MainScreens/Music/TracksListByCategory'
import AudioScreen from './MainScreens/Music/AudioScreen'

// Utils
import AsyncStorage_Calls from '../utills/AsyncStorage_Calls'
import { setToken } from '../redux/actions/AuthActions'
import CourseRegistration1 from './MainScreens/FormPages/CourseRegistration1'
import CourseRegistration2 from './MainScreens/FormPages/CourseRegistration2'
import CourseRegistration3 from './MainScreens/FormPages/CourseRegistration3'
import DeveloperScreenTest1 from './DeveloperScreen/DeveloperScreenTest1'
import CourseRegistration4 from './MainScreens/FormPages/CourseRegistration4'
import Donation from './MainScreens/Donation'

const Stack = createNativeStackNavigator()

const RootStack = () => {
    const [userStates, setUserStates] = useState();

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => state.login.isLogin)
    const [appIsReady, setAppIsReady] = useState(false)

    useEffect(() => {
        setUserStates(isLoggedIn)
    }, [isLoggedIn])




    // App initialization
    useEffect(() => {
        async function prepare() {
            try {
                // Prevent splash screen from auto-hiding
                await SplashScreen.preventAutoHideAsync()

                // Verify token
                await verifyToken()

                // Optional: Add a minimum loading time for better UX
                await new Promise(resolve => setTimeout(resolve, 1000))
            } catch (error) {
                console.warn('Error during app preparation:', error)
            } finally {
                setAppIsReady(true)
            }
        }

        prepare()
    }, [])


    // Custom header options
    const customHeaderOptions = () => ({
        headerStyle: {
            backgroundColor: 'white',
            borderBottomWidth: 4,
        },
        headerTintColor: '#030370',
        headerTitleAlign: 'center',
        headerTitleStyle: {
            fontFamily: 'Gabarito-VariableFont',
            fontSize: 20,
            fontWeight: '600',
            flex: 1,
            textAlign: 'center',
        },
        headerBackTitleVisible: false,
    })

    // Load custom fonts
    const [fontsLoaded] = useFonts({
        // 'VIVALDII': require('../assets/Fonts/VIVALDII_2.ttf'),
        'Gabarito-VariableFont': require('../assets/Fonts/Gabarito-VariableFont_wght.ttf'),
        'Outfit': require('../assets/Fonts/Outfit-VariableFont_wght.ttf'),
    })

    // Verify token from AsyncStorage
    const verifyToken = async () => {
        return new Promise((resolve) => {
            AsyncStorage_Calls.getAsyncValue('Token', (error, token) => {
                if (error) {
                    console.error('Error getting token:', error)
                } else if (token) {
                    console.log("Retrieved token:", token)
                    dispatch(setToken(token))
                }
                resolve()
            })
        })
    }

    // Handle layout and hide splash screen
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady && fontsLoaded) {
            try {
                await SplashScreen.hideAsync()
            } catch (error) {
                console.warn('Error hiding splash screen:', error)
            }
        }
    }, [appIsReady, fontsLoaded])

    // Show loading screen while app is not ready
    if (!appIsReady || !fontsLoaded) {
        return null
    }

    return (
        <ErrorBoundary FallbackComponent={CustomFallback}>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                    headerTintColor: 'red',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    // headerShown: false,
                }}
            >
                {userStates ? <>
                    {/* Authenticated user screens */}
                    <Stack.Group onReady={onLayoutRootView}>

                        {/* <Stack.Screen name="Deb" component={DeveloperScreenTest1}/> */}




                        <Stack.Screen name="BottomTabScreen" component={BottomTabScreen}
                            options={{
                                headerShown: false,
                            }}
                        />

                        {/* CourseRegistration1 */}
                        <Stack.Screen name="FormScreen"
                            component={CourseRegistration1}
                            options={customHeaderOptions}
                        />
                        <Stack.Screen name="CourseRegistration2"
                            component={CourseRegistration2}
                            options={customHeaderOptions}
                        />

                        <Stack.Screen name="CourseRegistration3"
                            component={CourseRegistration3}
                            options={customHeaderOptions}
                        />
                        <Stack.Screen name="CourseRegistration4"
                            component={CourseRegistration4}
                            options={customHeaderOptions}
                        />


                        {/* Donation */}

                        <Stack.Screen name="Donation"
                            component={Donation}
                            options={customHeaderOptions}
                        />
                        {/* <Stack.Screen name="CourseRegistration2"
                    component={CourseRegistration2}
                    options={customHeaderOptions}
                  />
  
                  <Stack.Screen name="CourseRegistration4"
                    component={CourseRegistration4}
                    options={customHeaderOptions}
                  /> */}



                        <Stack.Screen name="TracksAudios" component={TracksAudios}
                            options={customHeaderOptions} />

                        <Stack.Screen name="TracksListByCategory" component={TracksListByCategory}
                            options={customHeaderOptions} />

                        <Stack.Screen name="AudioScreen" component={AudioScreen}
                            options={{
                                headerShown: false,
                                animation: 'fade_from_bottom', // 👈 Add this
                            }}
                        />


                    </Stack.Group>
                </> : <>
                    {/* Non-authenticated user screens */}
                    <Stack.Group>
                        <Stack.Screen name="Login" component={Login} options={{
                            headerShown: false,
                            animation: 'slide_from_right', // 👈 Add this
                        }} />




                    </Stack.Group>
                </>}


            </Stack.Navigator>
        </ErrorBoundary>
    )
}

export default RootStack

const styles = StyleSheet.create({})