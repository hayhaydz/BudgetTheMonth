import React from 'react'
import {
StyleSheet,
View,
Text
} from 'react-native'

const SpendItem = ({ date, name, amount}) => {
    return (
        <View style={styles.spendItemContainer} >
            <View style={styles.spendItemLeft}>
                <Text style={styles.spendItemDate}>{date}</Text>
                <Text style={styles.spendItemName}>{name}</Text>
            </View>
            <Text style={styles.spendItemAmount}>£{amount}</Text>
        </View>
    )
}
export default SpendItem

const styles = StyleSheet.create({
    spendItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 3,
        borderColor: '#DCD0B9',
        paddingBottom: 15,
        marginBottom: 15,
    },
    spendItemLeft: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spendItemDate: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        color: '#7E7E7E',
        marginRight: 15,
    },
    spendItemName: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 18,
        color: '#121212',
    },
    spendItemAmount: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 18,
        color: '#121212',
    }
})