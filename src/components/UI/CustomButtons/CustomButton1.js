import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'


const CustomButton1 = ({ onPress, leftIcon, RightIcon, children, bgColor, stylebtn, boxWidth, isSubmitting, textStyling, btnContainerprops, isLoading = false }) => {

    return (
        <Pressable

            style={(
                { pressed }) => [
                    styles.button,
                    { backgroundColor: bgColor ? bgColor : "white" },
                    btnContainerprops,
                    stylebtn, { width: boxWidth },
                    pressed && styles.pressed]} onPress={onPress}
            disabled={isSubmitting}>
            <View style={{ marginRight: 10 }}>{leftIcon}</View>
            {!isLoading ? <Text style={[styles.text, textStyling]}>{children}</Text> : <ActivityIndicator visible={isLoading} style={textStyling} />}
            {/* <Spinner visible={isLoading} color={"white"} animation={'fade'} />
            } */}
            <View style={{ marginLeft: 10 }}>{RightIcon}</View>
        </Pressable>
    )
}

export default CustomButton1

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        height: 45
    },
    pressed: {
        opacity: 0.7
    },
    icon: {
        marginRight: 6
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 700,
        textTransform: 'none',
    }
})

