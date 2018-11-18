import React, { Fragment } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { TabNavigator, createStackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { Container, Header, Content, List, ListItem, Text, View, Body, Title } from 'native-base';
import reducer from './reducers'
import Deck from './components/Deck'
import HomeScreen from './components/HomeScreen'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'
import NewDeck from './components/NewDeck'
// import middleware from './middleware'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
import { setLocalNotification } from './utils/helpers'
import { Easing, Animated } from 'react-native'



const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {      
      const { position, scene } = sceneProps

      const thisSceneIndex = scene.index

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [0, 1],
      })

      return { opacity } 
    },
  }
}


const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Deck: Deck,
    Quiz: Quiz,
    NewCard: NewCard,
    NewDeck: NewDeck
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 500,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { position, scene } = sceneProps
        const thisSceneIndex = scene.index
        const opacity = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex],
          outputRange: [0, 1],
        })

        return { opacity } 
      }
    })
  },
  {
    initialRouteName: 'Home',
  },
)

export default class App extends React.Component {

  componentDidMount(){
    setLocalNotification()
  }


  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <Fragment>
          <MainNavigator/>
        </Fragment>   
      </Provider>
    );
  }
}
