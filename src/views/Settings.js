import React, { useEffect, useState } from 'react'
import {
StyleSheet,
Text,
View,
TouchableOpacity,
TextInput,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Layout from '../components/Layout/Layout'
import Title from '../components/Title/Title'
import RadioButton from '../components/RadioButton/RadioButton'

const Settings = ({ state, setState }) => {
    const [nameTIValue, setNameTIValue] = useState(state.name)
    const [isMealDeal, setIsMealDeal] = useState(state.mealDeal)
    const [budgetTIValue, setBudgetTIValue] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    const saveChanges = () => {
        setState({...state, name: nameTIValue, mealDeal: isMealDeal, budget: budgetTIValue})
        setIsEditing(!isEditing)
    }

    useEffect(() => {
        if(budgetTIValue !== state.budget.toString() && !isEditing) {
            setBudgetTIValue(state.budget.toString())
        }

        if(Number(budgetTIValue) < 0) {
            setBudgetTIValue('0')
        }
    })

    return (
        <Layout>
            <Title value="Settings" />
            <Text style={styles.heading}>Name</Text>
            <TextInput 
                style={styles.textInput}
                onChangeText={text=>setNameTIValue(text)}
                value={nameTIValue}
                editable={isEditing}
            />
            <Text style={styles.heading}>Would you like a meal deal everyday?</Text>
            <TouchableOpacity
                onPress={()=> isEditing ? setIsMealDeal(!isMealDeal) : null}
                disabled={!isEditing}
            >
                <View style={[styles.radioButton, isEditing ? { opacity: 1 } : { opacity: 0.3}]}>
                    <RadioButton selected={isMealDeal}></RadioButton>
                    <Text style={styles.radioButtonTxt}>YES</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=> isEditing ? setIsMealDeal(!isMealDeal) : null}
                disabled={!isEditing}
            >
                <View style={[styles.radioButton, isEditing ? { opacity: 1 } : { opacity: 0.3}]}>
                    <RadioButton selected={!isMealDeal}></RadioButton>
                    <Text style={styles.radioButtonTxt}>NO</Text>
                </View>
            </TouchableOpacity>
            <Text style={styles.heading}>How much money do you have for this month?</Text>
            <View>
                <TextInput 
                    style={[styles.textInput, { paddingLeft: 25 }]}
                    onChangeText={text=>setBudgetTIValue(text)}
                    value={budgetTIValue}
                    editable={isEditing}
                    keyboardType='numeric'
                />
                <Text style={styles.textInputPound}>£</Text>
            </View>
            {!isEditing &&
                <TouchableOpacity
                    style={styles.editBtn}
                    onPress={()=>setIsEditing(true)}
                >
                    <Ionicons name="create-outline" size={32} color="#121212"/>
                </TouchableOpacity>
            }
            {isEditing &&
                <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={()=>saveChanges()}
                >
                    <Text style={styles.saveBtnTxt}>Save Changes</Text>
                </TouchableOpacity>
            }
        </Layout>
    )
}
export default Settings

const styles = StyleSheet.create({
    heading: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 18,
        color: '#121212',
        marginTop: 25,
        marginBottom: 5,
        maxWidth: '80%',
    },
    textInput: {
        fontSize: 16,
        fontFamily: 'Roboto_400Regular',
        height: 40,
        backgroundColor: '#F0EBE0',
        padding: 10,
    },
    textInputPound: {
        position: 'absolute',
        top: 9,
        left: 9,
        fontSize: 16,
        fontFamily: 'Roboto_400Regular',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    radioButtonTxt: {
        fontSize: 16,
        fontFamily: 'Roboto_400Regular',
        marginLeft: 10,
    },
    editBtn: {
        position: 'absolute',
        top: 50,
        right: 20,
    },
    saveBtn: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: '100%',
        backgroundColor: '#76972D'
    },
    saveBtnTxt: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 18,
        color: '#F6F3ED',
        textTransform: 'uppercase',
    }
})