import React, { useState } from 'react'
import {
StyleSheet,
Text,
View,
TouchableOpacity,
TextInput,
Modal,
SafeAreaView,
FlatList
} from 'react-native'
import moment from 'moment'

import Layout from '../components/Layout/Layout'
import Title from '../components/Title/Title'
import SpendItem from '../components/SpendItem/SpendItem'

const Spending = ({ state, setState }) => {
    const [isCreating, setIsCreating] = useState(false)
    const [storeTIValue, setStoreTIValue] = useState('')
    const [amountTIValue, setAmountTIValue] = useState('')
    const [warning, setWarning] = useState('')

    const createSpend = () => {
        if(storeTIValue !== '') {
            if(amountTIValue !== '') {
                if(Number(amountTIValue) <= state.budget) {
                    if(Number(amountTIValue) > 0) {
                        let spendItem = {}
                        let localSpending = state.spending
                        spendItem.date = moment(new Date()).format("DD/MM/YYYY")
                        spendItem.storeName = storeTIValue
                        spendItem.amount = amountTIValue
                        localSpending.unshift(spendItem)
                        let localBudget = state.budget - spendItem.amount
                        setState(()=>({...state, budget: localBudget, spending: localSpending}))

                        setIsCreating(false)
                        setStoreTIValue('')
                        setAmountTIValue('')
                        setWarning('')
                    } else {
                        setWarning('Amount spent must be a positive number')
                    }
                } else {
                    setWarning('That exceeds your available budget please correct your budget or enter a lower amount. You have £' + state.budget.toString() + ' available')
                }
            } else {
                setWarning('Please enter an amount spent')
            }
        } else {
            setWarning('Please enter a store name value')
        }
    }

    const clearSpends = () => {
        let localSpending = state.spending
        localSpending = []
        setState(()=>({...state, spending: localSpending}))
    }

    const renderSpendItem = ({ item }) => (
        <SpendItem date={item.date} name={item.storeName} amount={item.amount}/>
    )

    return (
        <Layout>
            <Modal
                animationType="fade"
                transparent={false}
                visible={isCreating}
            >
                <View style={styles.modalCentered}>
                    <Text style={styles.modalHeading}>Create new store spending moment</Text>
                    <Text style={styles.modalLabel}>Store Name</Text>
                    <TextInput 
                        style={styles.modalTI}
                        onChangeText={text => setStoreTIValue(text)}
                        value={storeTIValue}
                        placeholder="Tesco"
                        maxLength={10}
                    />
                    <Text style={styles.modalLabel}>Amount Spent</Text>
                    <View style={styles.modalAmountContainer}>
                        <TextInput 
                            style={[styles.modalTI, { paddingLeft: 20 }]}
                            onChangeText={text => setAmountTIValue(text)}
                            value={amountTIValue}
                            placeholder="0"
                            keyboardType="numeric"
                            maxLength={5}
                        />
                        <Text style={styles.modalAmountUnit}>£</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.modalBtn}
                        onPress={()=>createSpend()}
                    >
                        <Text style={styles.modalBtnTxt}>ENTER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.modalBtn, { backgroundColor: '#F6F3ED', borderWidth: 5, borderColor: '#121212'}]}
                        onPress={()=>setIsCreating(false)}
                    >
                        <Text style={[styles.modalBtnTxt, { color: '#121212'}]}>CANCEL</Text>
                    </TouchableOpacity>
                    {warning !== '' &&
                        <Text style={styles.modalWarning}>{warning}</Text>
                    }
                </View>
            </Modal>
            <Title value="Spending" />
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: '#76972D', marginRight: 5 }]}
                    onPress={()=>setIsCreating(true)}
                >
                    <Text style={styles.btnTxt}>NEW</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: '#C3423F', marginLeft: 5 }]}
                    onPress={()=>clearSpends()}
                >
                    <Text style={styles.btnTxt}>CLEAR</Text>
                </TouchableOpacity>
            </View>
            <SafeAreaView style={styles.listContainer}>
                <FlatList
                    data={state.spending}
                    renderItem={renderSpendItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView>
        </Layout>
    )
}
export default Spending

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 25,
        marginBottom: 25,
    },
    btn: {
        width: '48%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTxt: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 14,
        color: '#F6F3ED'
    },
    modalCentered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#F6F3ED',
        padding: 16,
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
    },
    modalTI: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 18,
        height: 40,
        width: '100%',
        borderBottomWidth: 5,
        borderColor: '#121212',
        padding: 5,
        marginBottom: 15,
    },
    modalAmountContainer: {
        width: '100%'
    },
    modalAmountUnit: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 18,
        position: 'absolute',
        top: 7,
        left: 3,
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
    listContainer: {
        flex: 1,
    },
})