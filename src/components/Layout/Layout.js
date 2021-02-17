import React from 'react'
import {
StyleSheet,
View
} from 'react-native'

const Layout = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}
export default Layout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F3ED',
        padding: 16,
        paddingBottom: 0,
        paddingTop: 50
    }
})