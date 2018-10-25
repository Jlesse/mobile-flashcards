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


const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Deck: Deck,
    Quiz: Quiz,
    NewCard: NewCard,
    NewDeck: NewDeck
  },
  {
    initialRouteName: 'Home',
  }
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
      <Fragment>
        <MainNavigator/>
      </Fragment>
      </Provider>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
