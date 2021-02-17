import React from 'react'
import {
StyleSheet,
Text,
View,
} from 'react-native'

const Title = ({ value }) => {
    return (
        <View>
            <View style={styles.highlight}/>
            <Text style={styles.title}>{value}</Text>
        </View>
    )
}
export default Title

const styles = StyleSheet.create({
    highlight: {
        position: 'absolute',
        top: 8,
        left: 10,
        width: 80,
        height: 20,
        backgroundColor: 'rgba(184, 130, 0, 0.25)',
    },
    title: {
        fontSize: 22,
        fontFamily: 'Roboto_700Bold'
    }
})