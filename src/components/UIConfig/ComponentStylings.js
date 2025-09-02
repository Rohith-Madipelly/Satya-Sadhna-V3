import { StyleSheet, Platform } from 'react-native'
import Metrics from '../../Utills/ResposivesUtils/Metrics'


export default StyleSheet.create({

    filterDropDownContainer: {
        position: 'absolute',
        top: 25,
        right: 0,
        padding: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#CDD5DF',
        borderWidth: 1,
        borderRadius: 4,
        // zIndex: 300, // Must be higher than other overlapping elements
    },
    filterDropDownOptionItem: {
        padding: 10, width: Metrics.rfv(135), fontWeight: '400', color: '#4C5664',
        borderRadius: 5,
    }
})