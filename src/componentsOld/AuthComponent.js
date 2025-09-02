import { Button, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions } from 'react-native'


import { LinearGradient } from 'expo-linear-gradient';
import Metrics from '../utills/ResposivesUtils/Metrics';
import CustomStatusBar from '../components/UI/CustomStatusBar/CustomStatusBar';
import GlobalStyles from '../components/UIConfig/GlobalStyles';

const { width, height } = Dimensions.get('screen')

const AuthComponent = ({ NameUnderLogo, titleUnder, screenName, children }) => {
    return (
        <LinearGradient style={{ height: height }} colors={['rgba(3, 3, 112, 1)', 'rgba(3, 3, 120, 1)', '#E5EFF3']}>
            <CustomStatusBar barStyle="light-content" backgroundColor={"rgba(3, 3, 112, 1)"} />
            <View style={{ marginTop: '19%' }}>

                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={[{ width: Metrics.rfv(100), height: Metrics.rfv(100) , elevation: 3 },]}

                        source={require("../../assets/icon.png")}
                        contentFit="cover"
                        transition={1000}
                        alt=''
                    />
                    <Text style={styles.TextSize_H3}>{NameUnderLogo}</Text>
                    <Text style={[styles.paragraphy, { marginTop: 2, width: '70%', textAlign: 'center', color: '#FFF', }]}>{titleUnder}</Text>
                </View>


                <View style={{ borderRadius: 30, overflow:'hidden',width:width}}>

                    <ImageBackground
                        style={{ width: width, height: '99%', position: 'relative', paddingTop: 25, display: 'flex', alignItems: 'center',  }}
                        blurRadius={0.2}
                        source={require("../assets/Image/BackgroundImageRec.png")}
                    >
                        <View style={{ marginBottom: 1, marginTop: 10, display: 'flex', alignItems: 'center', }} >
                            <Text style={[styles.TextSize_H2, { marginVertical: 10, alignItems: 'center' }]}>{screenName}</Text>
                        </View>
                        <View style={{ width: width }}>
                            {children}
                        </View>
                    </ImageBackground>
                </View>

            </View>
        </LinearGradient>
    )
}

export default AuthComponent

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',

    },
    image: {
        width: 20,
    },


    TextSize_H2: {
        color: 'black',
        // fontFamily: 'Jost',
        fontSize: 18,
        fontWeight: '500',
        // lineHeight: 20,
    },

    // Text Styles
    TextSize_H3: {
        color: '#FFF',
        // fontFamily: 'Jost',
        fontSize: 20,
        fontWeight: '500',
        // lineHeight: 20,
    },
    paragraphy: {

        // fontFamily: 'Jost',
        fontSize: 14,
        fontWeight: '300',
        // lineHeight: 20,
    },
    underline: {
        textDecorationLine: 'underline',
    }

})