import React from 'react'
import { Container, Header, Content, List, ListItem, Text, View, Body, Title } from 'native-base';
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { fetchDecks } from '../utils/api'
import { receiveDecks } from '../actions/index'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'My Flash Card Decks'
  }

  componentDidMount () {
    const { dispatch } = this.props
    fetchDecks()
      .then((decks) => {
        dispatch(receiveDecks(decks))
      })
  }


  render(){
    const { navigate } = this.props.navigation
    const { decks } = this.props
    return (
      <Container>
        <Content padder>
          <List>
            <ListItem key='newDeck' onPress={() => navigate("NewDeck")}>
              <Ionicons name='md-add-circle' size={45}/>
              <Text> Add New Deck</Text>  
            </ListItem>
            {Object.keys(decks).map((id) => {
              const deck = decks[id]
              return(
                <ListItem key={id} onPress={() => navigate("Deck", {id: id, title: deck.title})}>
                  <Text>{`Name: ${deck.title} \nCards: ${deck.cards.length}`}</Text>
                </ListItem>
              )
            })}
          </List>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state){
  return {
    decks: state.decks ? state.decks : []
  }
}

export default connect(mapStateToProps)(HomeScreen)