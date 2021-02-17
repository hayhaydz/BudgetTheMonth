import React from 'react'
import {
StyleSheet,
Text,
View
} from 'react-native'

import Layout from '../components/Layout/Layout'
import Title from '../components/Title/Title'

const Information = () => {
    return (
        <Layout>
            <Title value="Information"/>
            <Text style={styles.heading}>How does it work?</Text>
            <Text style={styles.text}>Budget the month takes the amount of money you have and divides it up into a sensible amount to use every weel. With the inclusion of an option for eating a meal deal every day as well as this.</Text>
            <Text style={styles.heading}>How do I use it?</Text>
            <Text style={styles.text}>Using Budget the month is quite simple, you simply head over to the settings page and enter how much money you currently have. Budget the month will then calculate how much you have to spend every day for the rest of this month.</Text>
            <Text style={styles.heading}>Contact Information</Text>
            <Text style={styles.text}>Created by <Text style={styles.bold}>Haydon Curteis-Lateo</Text></Text>
            <Text style={styles.text}>Email <Text style={styles.bold}>haydon.curteis-lateo18@bathspa.ac.uk</Text></Text>
        </Layout>
    )
}
export default Information;

const styles = StyleSheet.create({
    heading: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 28,
        color: '#161616',
        marginTop: 50,
    },
    text: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 18,
        lineHeight: 26,
        color: '#323232',
        marginTop: 15,
    },
    bold: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 18,
        color: '#161616',
    }
})