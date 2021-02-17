import React, { useState, useEffect } from 'react'
import {
StyleSheet,
Text,
View,
Modal,
TouchableOpacity,
TextInput,
Image,
SafeAreaView,
ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Layout from '../components/Layout/Layout'
import Title from '../components/Title/Title'
import RadioButton from '../components/RadioButton/RadioButton'
import SpendItem from '../components/SpendItem/SpendItem'

import Logo from '../../assets/logo_small.png'

const Home = ({ state, setState}) => {
    const [modalVisible, setModalVisible] = useState(true)
    const [modalIndex, setModalIndex] = useState(0)
    const [nameTIValue, setNameTIValue] = useState('')
    const [budgetTIValue, setBudgetTIValue] = useState('')
    const [warning, setWarning] = useState(false)
    const [isMealDeal, setIsMealDeal] = useState(true)
    const [weeklyBudgetColour, setWeeklyBudgetColour] = useState('#EB9413')
    const [dailyBudgetColour, setDailyBudgetColour] = useState('#EB9413')
    const modalPages = [
        (
            <View>
                <Text style={styles.modalHeading}>Hey!</Text>
                <Text style={styles.modalHeading}>What’s your name?</Text>
                <Text style={styles.modalLabel}>Full Name</Text>
                <TextInput
                    style={styles.modalTI}
                    onChangeText={text => setNameTIValue(text)}
                    value={nameTIValue}
                    placeholder="Bob Dylan"
                />
                <TouchableOpacity
                    onPress={()=>nextModal()}
                >
                    <View style={styles.modalBtn}>
                        <Text style={styles.modalBtnTxt}>NEXT</Text>
                    </View>
                </TouchableOpacity>
            </View>
        ),
        (
            <View>
                <Text style={styles.modalHeading}>Would you like a meal deal everyday?</Text>
                <TouchableOpacity
                    onPress={()=>setIsMealDeal(!isMealDeal)}
                >
                    <View style={styles.modalRadioButton}>
                        <RadioButton selected={isMealDeal}></RadioButton>
                        <Text style={styles.modalRadioButtonTxt}>YES</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>setIsMealDeal(!isMealDeal)}
                >
                    <View style={styles.modalRadioButton}>
                        <RadioButton selected={!isMealDeal}></RadioButton>
                        <Text style={styles.modalRadioButtonTxt}>NO</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>nextModal()}
                >
                    <View style={styles.modalBtn}>
                        <Text style={styles.modalBtnTxt}>NEXT</Text>
                    </View>
                </TouchableOpacity>
            </View>
        ),
        (
            <View>
                <Text style={styles.modalHeading}>How much money do you have for this month?</Text>
                <Text style={styles.modalLabel}>Money</Text>
                <TextInput
                    style={[styles.modalTI, { paddingLeft: 25 }]}
                    onChangeText={text => setBudgetTIValue(text)}
                    value={budgetTIValue}
                    placeholder="0"
                    keyboardType='numeric'
                />
                <Text style={styles.modalTIPound}>£</Text>
                <TouchableOpacity
                    onPress={()=>nextModal()}
                >
                    <View style={styles.modalBtn}>
                        <Text style={styles.modalBtnTxt}>ENTER</Text>
                    </View>
                </TouchableOpacity>
            </View>
        ),
    ]

    const nextModal = () => {
        if(modalIndex < modalPages.length - 1) {
            if(nameTIValue == '' && modalIndex == 0 || budgetTIValue == 0 && modalIndex == 2) {
                setWarning(true)
            } else {
                setModalIndex(modalIndex+1)
                setWarning(false)
            }
        } else {
            setModalVisible(false)
            setState({...state, name: nameTIValue, mealDeal: isMealDeal, budget: Number(budgetTIValue)})
        }
    }

    const previousModal = () => {
        setModalIndex(modalIndex-1)
    }

    useEffect(() => {
        if(state.budget !== 0) {
            setModalVisible(false)
        }
    }, [])

    useEffect(() => {
        if(state.weeklyBudget >= 30) {
            setWeeklyBudgetColour('#84eb13')
        } else if (state.weeklyBudget >= 25) {
            setWeeklyBudgetColour('#EB9413')
        } else {
            setWeeklyBudgetColour('#EB4013')
        }

        if(state.dailyBudget >= 3.5) {
            setDailyBudgetColour('#84eb13')
        } else if (state.dailyBudget >= 2.5) {
            setDailyBudgetColour('#EB9413')
        } else {
            setDailyBudgetColour('#EB4013')
        }
    })

    return (
        <Layout>
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <Image source={Logo} style={styles.modalLogo}/>
                    <View style={styles.modalView}>
                        {modalPages[modalIndex]}
                        {warning &&
                            <Text style={styles.modalWarning}>Please enter a value!</Text>
                        }
                    </View>
                        {modalIndex !== 0 &&

                            <TouchableOpacity
                                onPress={()=>previousModal()}
                                style={styles.modalPrvBtn}
                            >
                                <View >
                                    <Ionicons name="arrow-back-outline" size={32} color="#121212"/>
                                </View>
                            </TouchableOpacity>
                        }
                </View>
            </Modal>
            <SafeAreaView>
                <ScrollView>
                    <Title value="Home"/>
                    <Text style={styles.greetingSubheading}>Hello,</Text>
                    <Text style={styles.greetingHeading}>{state.name}</Text>
                    <Text style={styles.heading}>Weekly Budget</Text>
                    <Text style={[styles.value, { color: weeklyBudgetColour }]}>£{parseFloat(state.weeklyBudget).toFixed(2)}</Text>
                    {state.mealDeal && (
                        <View>  
                            <Text style={styles.heading}>Daily Budget</Text>
                            <Text style={[styles.value, { color: dailyBudgetColour }]}>£{parseFloat(state.dailyBudget).toFixed(2)}</Text>
                        </View>
                    )}
                    <Text style={styles.heading}>Recent Spending</Text>
                    <View style={styles.recentSpendingContainer}>
                        {state.spending.map((value, index) => {
                            if(index < 5) {
                                return (
                                    <View key={index}>
                                        <SpendItem date={value.date} name={value.storeName} amount={value.amount}/>
                                    </View>
                                )
                            }
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Layout>
    )
}
export default Home

const styles = StyleSheet.create({
    greetingSubheading: {
        fontSize: 22,
        fontFamily: 'Roboto_700Bold',
        color: '#505050',
        marginTop: 50,
    },
    greetingHeading: {
        fontSize: 42,
        fontFamily: 'Roboto_900Black',
        color: '#252525',
    },
    heading: {
        fontSize: 22,
        fontFamily: 'Roboto_700Bold',
        color: '#161616',
        marginTop: 25,
    },
    value: {
        fontSize: 82,
        fontFamily: 'Roboto_900Black',
        color: '#EB9413',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#F6F3ED'
    },
    modalLogo: {
        position: 'absolute',
        top: 16,
        left: 16,
        width: 60,
        height: 60,
    },
    modalHeading: {
        fontSize: 42,
        fontFamily: 'Roboto_700Bold',
        color: '#161616',
        maxWidth: '80%',
        marginBottom: 15,
    },
    modalLabel: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 14,
        color: '#505050',
        marginTop: 10,
    },
    modalTI: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 18,
        height: 40,
        borderBottomWidth: 5,
        borderColor: '#121212',
        padding: 5,
    },
    modalTIPound: {
        position: 'absolute',
        fontFamily: 'Roboto_400Regular',
        fontSize: 20,
        bottom: 72,
    },
    modalBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#76972D',
        marginTop: 15,
    },
    modalBtnTxt: {
        fontSize: 22,
        fontFamily: 'Roboto_700Bold',
        color: '#F6F3ED'
    },
    modalWarning: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        color: '#D81C1C',
        marginTop: 15,
    },
    modalRadioButton: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    modalRadioButtonTxt: {
        fontSize: 22,
        fontFamily: 'Roboto_700Bold',
        marginLeft: 10,
    },
    modalPrvBtn: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        padding: 10,
    },
    recentSpendingContainer: {
        marginTop: 25,
    }
})