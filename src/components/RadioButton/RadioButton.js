import React from 'react'
import {
View,
} from 'react-native'

//https://stackoverflow.com/questions/31889921/how-to-implement-radio-button-in-react-native
const RadioButton = ({ selected }) => {
    return (
      <View style={{
        height: 32,
        width: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {
          selected ?
            <View style={{
              height: 16,
              width: 16,
              borderRadius: 8,
              backgroundColor: '#000',
            }}/>
            : null
        }
      </View>
  )
}
export default RadioButton