import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home/Home';
import Profile from './Profile/Profile';
import Downloads from './Downloads/Downloads';
import LivePage from './LivePage/LivePage';

import Metrics from '../../../utills/ResposivesUtils/Metrics';

import HomeIcon from '../../../assets/SVGS/HomeIcon';
import HomeActive from '../../../assets/SVGS/HomeActive';

import LiveIcon from '../../../assets/SVGS/LiveIcon';
import LiveActive from '../../../assets/SVGS/LiveActive';
import { Feather } from '@expo/vector-icons';

import ProfileIcon from '../../../assets/SVGS/ProfileIcon';
import ProfileActive from '../../../assets/SVGS/ProfileActive';
import Options from '../../../assets/Image/Navigation/Options';
import BackIcons from '../../../assets/Image/Navigation/BackIcons';

const Tab = createBottomTabNavigator();


const BottomTabConfig = {
    headerShown: true,
    headerBackVisible: true,
    // headerTitle: 'Hello Rohith',
    headerTitleAlign: 'center',
    headerStyle: {
        backgroundColor: 'white',
    },
    headerTintColor: '#030370',
    headerTitleStyle: {
        fontFamily: 'Gabarito-VariableFont',
        fontSize: 20,
        fontWeight: '600',
    },
}



const BottomTabScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,

                tabBarStyle: {
                    flex: Platform.OS === "ios" ? 0.07 : 0.100,
                    backgroundColor: '#EEEEFF',
                    paddingTop: 10
                },

                tabBarItemStyle: {
                    width: 120, // Customize the width of each tab
                },

                tabBarIcon: ({ focused, size, colour }) => {

                    if (route.name === "Home") {
                        return (
                            <View style={styles.tabItemContainer}>
                                {focused ? <HomeIcon /> : <HomeActive />}
                                <Text style={[styles.tabItemText, { color: focused ? "#030370" : "#64748B", fontWeight: focused ? 700 : 500 }]}>Home</Text>
                            </View>)
                    }

                    else if (route.name === "LivePage") {
                        return (
                            <View style={styles.tabItemContainer}>
                                {focused ? <LiveActive /> : <LiveIcon />}
                                <Text style={[styles.tabItemText, { color: focused ? "#030370" : "#64748B", fontWeight: focused ? 700 : 500 }]}>Live</Text>
                            </View>)
                    }

                    else if (route.name === "Downloads") {
                        return (
                            <View style={styles.tabItemContainer}>
                                {focused ? <Feather name="download" size={24} color="#030370" /> : <Feather name="download" size={24} color="#64748B" />}
                                <Text style={[styles.tabItemText, { color: focused ? "#030370" : "#64748B", fontWeight: focused ? 700 : 500 }]}>Downloads</Text>
                            </View>)
                    }


                    else if (route.name === "Profile") {
                        return (
                            <View style={styles.tabItemContainer}>
                                {focused ? <ProfileActive /> : <ProfileIcon />}
                                <Text style={[styles.tabItemText, { color: focused ? "#030370" : "#64748B", fontWeight: focused ? 700 : 500 }]}>Profile</Text>
                            </View>)
                    }

                }
            })}

        >
            <Tab.Screen name="Home" component={Home}
                options={({ navigation }) => ({
                    ...BottomTabConfig,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginLeft: 15 }}>
                            <Options />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 15 }}>
                            <View style={{}}></View>
                        </TouchableOpacity>
                    ),
                })}

            />
            <Tab.Screen name="LivePage" component={LivePage}
                options={({ navigation }) => ({
                    ...BottomTabConfig,
                    // Live Channel
                    headerTitle: 'Live Channel',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
                            <BackIcons />
                        </TouchableOpacity>
                    ),
                })} />

            <Tab.Screen name="Downloads" component={Downloads}
                options={({ navigation }) => ({
                    ...BottomTabConfig,
                    headerTitle: 'Downloads',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
                            <BackIcons />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Tab.Screen name="Profile" component={Profile} options={({ navigation }) => ({
                ...BottomTabConfig,
                headerTitle: 'Profile',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
                        <BackIcons />
                    </TouchableOpacity>
                ),
            })} />

        </Tab.Navigator>
    )
}

export default BottomTabScreen

const styles = StyleSheet.create({

    tabItemContainer: {
        flexDirection: 'column', alignItems: 'center', marginTop: 7, width: Metrics.rfv(90)
    },
    tabItemText: {
        fontSize: Metrics.rfv(12, 700), marginTop: Metrics.rfv(5), width: '100%',
        textAlign: 'center'
    }
})