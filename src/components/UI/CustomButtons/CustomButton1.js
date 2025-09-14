import { Pressable, StyleSheet, Text, View } from 'react-native'
import { PRIMARY_COLOR } from '../../UIConfig/AppContants'

const CustomFormButton = ({ onPress, leftIcon, children, bgColor, styleData }) => {

    return (
        <Pressable

            style={({ pressed }) => [styles.button, styleData, pressed && styles.pressed]} onPress={onPress} >
            {/* <Ionicons style={styles.icon} name={icon} size={18} color={Colors.white} /> */}
            <View style={{ marginRight: 10 }}>{leftIcon}</View>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

export default CustomFormButton

const styles = StyleSheet.create({
    button: {

        flexDirection: 'row',
        justifyContent: 'space-evenly',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth:1,
        // borderColor: Colors.primary500,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 20,
        // paddingHorizontal:12,
        paddingVertical: 15,
        margin: 10,
        width: '78%'
    },
    pressed: {
        opacity: 0.7
    },
    icon: {
        marginRight: 6
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: '400'
    }
})

