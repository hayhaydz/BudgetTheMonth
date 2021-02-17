import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import {
useFonts,
Roboto_400Regular,
Roboto_700Bold,
Roboto_900Black,
} from '@expo-google-fonts/roboto'

import Home from './src/views/Home'
import Spending from './src/views/Spending'
import Information from './src/views/Information'
import Settings from './src/views/Settings'

const Tab = createBottomTabNavigator()

const App = () => {
  const SOTRAGE_KEY = '@state_key'
  const [isReady, setIsReady] = useState(false)
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_900Black,
  })
  const [state, setState] = useState({
    name: '',
    mealDeal: true,
    budget: 0,
    weeklyBudget: 0,
    dailyBudget: 0,
    spending: [],
  })

  const _storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(SOTRAGE_KEY, jsonValue)
    } catch(e) {
      console.log(e)
    }
  }

  const _retrieveData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SOTRAGE_KEY)
      if(jsonValue != null) {
        let obj = JSON.parse(jsonValue)
        setState(() => ({...state, name: obj.name, mealDeal: obj.mealDeal, budget: obj.budget, weeklyBudget: obj.weeklyBudget, dailyBudget: obj.dailyBudget, spending: obj.spending}))
      } else {
        console.log('No async storage available')
      }
    } catch(e) {
      console.log(e)
    }
  }

  const calculateBudgets = () => {
      let endOfMonth = moment().endOf('month')
      let now = moment()
      let daysLeft = endOfMonth.diff(now, 'days')
      let weeksLeft = endOfMonth.diff(now, 'weeks')
      let localWeeklyBudget
      let localDailyBudget
      let spareBudget

      if(weeksLeft == 0) {
        weeksLeft = 1
      }

      localWeeklyBudget = state.budget / weeksLeft

      if(state.mealDeal) {
        if(state.budget > 25) {
          let maximumDailyBudget = 3.5 * daysLeft;
          if(state.budget - maximumDailyBudget > 25) {
            localWeeklyBudget -= maximumDailyBudget / weeksLeft
            localDailyBudget = maximumDailyBudget / daysLeft
          } else {
            spareBudget = localWeeklyBudget - 25
            localWeeklyBudget -= spareBudget
            localDailyBudget = (spareBudget * weeksLeft) / daysLeft
          }
        } else {
          localDailyBudget = 0
        }
      }

      if(state.weeklyBudget !== localWeeklyBudget) {
        setState(() => ({...state, weeklyBudget: localWeeklyBudget}))
      }

      if(state.dailyBudget !== localDailyBudget) {
        setState(() => ({...state, dailyBudget: localDailyBudget}))
      }
  }

  useEffect(() => {
    _retrieveData()
  }, [])

  useEffect(() => {
    console.log(state)
    if(state.name !== '') {
      calculateBudgets()
      _storeData(state)
    }
  })

  if(!fontsLoaded) {
    return <AppLoading />
  }
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#F6F3ED',
          activeBackgroundColor: '#76972D',
          inactiveTintColor: '#76972D',
          inactiveBackgroundColor: '#F6F3ED',
          showLabel: false,
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName

            if(route.name == "Home") {
              iconName = 'home-outline'
            } else if (route.name == "Spending") {
              iconName = 'card-outline'
            } else if (route.name == "Information") {
              iconName = 'information-circle-outline'
            } else if (route.name == "Settings") {
              iconName = 'settings-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
        })}
      >
        <Tab.Screen name="Home" children={() => <Home state={state} setState={setState}/>} />
        <Tab.Screen name="Spending" children={() => <Spending state={state} setState={setState}/>} />
        <Tab.Screen name="Information" children={() => <Information/>} />
        <Tab.Screen name="Settings" children={() => <Settings state={state} setState={setState}/>} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
export default App