import React from 'react'
import { Container, Header, Content, List, ListItem, Text, View, Body, Title } from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import { Col, Row, Grid } from 'react-native-easy-grid';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'My Flash Card Decks'
  }

  render(){
    const { navigate } = this.props.navigation

    return (
      <Container>
        <Content padder>
          <List>
            <ListItem onPress={() => navigate("NewDeck")}>
              <Ionicons name='md-add-circle' size={45}/>
              <Text> Add New Deck</Text>  
            </ListItem>
            <ListItem onPress={() => navigate("Deck", {id: 1})}>
              <Text>{`Name: Deck 1 \nCards: 52`}</Text>
            </ListItem>
            <ListItem onPress={() => navigate("Deck", {id: 2})}>
              <Text>{`Name: Deck 2 \nCards: 12`}</Text>
            </ListItem>
            <ListItem onPress={() => navigate("Deck", {id: 3})}>
              <Text>{`Name: Deck 3 \nCards: 12`}</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

export default HomeScreen