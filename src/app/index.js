import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CustomFallback from './OtherScreens/CustomFallback'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ErrorBoundary from 'react-native-error-boundary';

// Auth Screens Imports
import Login from './AuthScreens/Login';
import BottomTabScreen from './MainScreens/BottomTabScreen';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage_Calls from '../utills/AsyncStorage_Calls';
import { setToken } from '../redux/actions/AuthActions';
import { useFonts } from 'expo-font';
import TracksAudios from './MainScreens/Music/TracksAudios';
import TracksListByCategory from './MainScreens/Music/TracksListByCategory';
import AudioScreen from './MainScreens/Music/AudioScreen';
import DeveloperScreenTest1 from './DeveloperScreen/DeveloperScreenTest1';




const RootStack = () => {
    const [userStates, setUserStates] = useState();

    const Stack = createNativeStackNavigator();
    const dispatch = useDispatch();

    const [appIsReady, setAppIsReady] = useState(false);

    const loginSelector = useSelector((state) => state.login.isLogin);
    console.log(">>>>>>>>>>>>>>>>>isLogin", loginSelector)






    console.log("loginSelector", loginSelector)



    // Gets token from asyncStorage Verify 
    const verifyToken = async () => {
        AsyncStorage_Calls.getAsyncValue('Token', (error, token) => {
            if (error) {
                console.error('Error getting token:', error);
            } else {
                if (token != null) {
                    console.log("tokrn", token)
                    dispatch(setToken(token));
                } else {
                }
            }
            setAppIsReady(true);
        });
    }

    useEffect(() => {
        setUserStates(loginSelector)
    }, [loginSelector])




    useEffect(() => {
        async function prepare() {
            try {
                await verifyToken();

                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);


    // const [fontsLoaded] = useFonts({
    //     'Gabarito-VariableFont': require('../assets/Fonts/Gabarito-VariableFont_wght.ttf'),
    //     'Outfit': require('../assets/Fonts/Outfit-VariableFont_wght.ttf'),
    //     'VIVALDII': require('../assets/Fonts/VIVALDII 2.ttf'),
    // });



    // const onLayoutRootView = useCallback(async () => {
    //     if (appIsReady && fontsLoaded) {
    //         // This tells the splash screen to hide immediately! If we call this after
    //         // `setAppIsReady`, then we may see a blank screen while the app is
    //         // loading its initial state and rendering its first pixels. So instead,
    //         // we hide the splash screen once we know the root view has already
    //         // performed layout.

    //         //   await SplashScreen.hideAsync();
    //     }
    // }, [appIsReady, fontsLoaded]);

    // if (!appIsReady || !fontsLoaded) {
    //     return null;
    // }


    const customHeaderOptions = ({ navigation }) => ({
        // headerShadowVisible: false,
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
            // fontWeight: 'bold',
            flex: 1, // ✅ Helps title take more space
            textAlign: 'center', // ✅ Center text in that space
        },
        headerBackTitleVisible: false,
    });

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
                    <Stack.Group>

                        {/* <Stack.Screen name="Deb" component={DeveloperScreenTest1}/> */}

                        {/* <Stack.Screen name="BottomTabScreen" component={BottomTabScreen}
                            options={{
                                headerShown: false,
                            }}
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