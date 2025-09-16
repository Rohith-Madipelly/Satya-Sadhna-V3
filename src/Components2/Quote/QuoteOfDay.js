import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'

import QuoteIcon from '../../assets/SVGS/MusicPlayer/QuoteIcon'
import { useNavigation } from '@react-navigation/native'
import Metrics from '../../utills/ResposivesUtils/Metrics'
import SkeletonLoader2 from '../../components/UI/Loadings/SkeletonLoader'

const QuoteOfDay = ({ Quote, isQuoteOfDay, bgColor, disabled = true }) => {

    const navigation = useNavigation()

    const [loadingList, setLoadingList] = useState(false)
    // console.log(Data)



    useEffect(() => {
        setTimeout(() => {
            setLoadingList(false)
        }, 2000)

    }, [])
    return (
        <>
            <TouchableOpacity
                disabled={disabled}
                style={{
                    maxHeight: Metrics.height * 0.12,
                    minHeight: 120,
                    backgroundColor: bgColor ? bgColor : 'rgba(168, 168, 255, 0.30)',
                    padding: 10, marginHorizontal: 10, borderRadius: 13
                }} onPress={() => { navigation.navigate("QuotesScreen") }}>
                <ImageBackground
                    style={{ position: 'relative', display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}
                    // contentFit="fixed"
                    // blurRadius={0.2}
                    resizeMode='fill'
                    source={require("../../assets/Image/Home/Vector2.png")}
                >
                    <View style={{ width: '17%', top: 5, left: 5 }}>
                        <QuoteIcon />
                    </View>


                    <View style={{ width: '82%', alignSelf: 'center' }}>
                        {isQuoteOfDay ? <Text style={{ fontFamily: 'Gabarito-VariableFont', color: 'rgba(3, 3, 112, 1)', fontSize: Metrics.rfv(20) }}>{isQuoteOfDay ? "Quote of the day" : ""}</Text> : ""}
                        <Text numberOfLines={3} style={{ fontFamily: 'Gabarito-VariableFont', color: 'rgba(139, 139, 169, 1)', fontSize: Metrics.rfv(14) }}>{Quote ? Quote : "No Quote"}</Text>
                        {loadingList ? <SkeletonLoader2
                            style={{
                                width: '100%',
                                height: Metrics.rfv(30),
                                borderRadius: 5,
                                marginBottom: 10,
                            }}
                        >
                        </SkeletonLoader2> : ""}
                    </View>
                </ImageBackground>
            </TouchableOpacity>

        </>
    )
}

export default QuoteOfDay

const styles = StyleSheet.create({})