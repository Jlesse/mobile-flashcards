import React from 'react'
import { connect } from 'react-redux'
import { Container, Header, Content, Textarea, Form, Label, Button, Text, Right} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet } from 'react-native'
import { QUESTION, ANSWER } from '../utils/api'
import { addCard } from '../actions/index'
import { storeDeck } from '../utils/api'


class NewCard extends React.Component{
  state = {
    answer: '',
    question: '',
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.title
    }
  }

  handleChangeText = (text, key) => {
    this.setState((prevState) => ({
      ...prevState,
      [key]: text
    }))
  }

  handleSubmit = () => {
    const {deck, deckId } = this.props
    const num = (deck.cards.length / 2) + 1
    newCard = { deckId: deckId,
                card: [{
                  header: QUESTION,
                  text: this.state.question,
                  num: num,
                },
                {
                  Header: ANSWER,
                  text: this.state.answer,
                  num: num,
                }]
              }
    this.props.dispatch(addCard(newCard))

    deck.cards = [...deck.cards, ...newCard.card]
    storeDeck({[deckId]: deck})
    this.props.navigation.navigate("Deck", {id: deckId})
  }

  render(){
    const { answer, question } = this.state
    return (
      <Container>
        <Content padder>
          <Form>
            <Label>Question</Label>
            <Textarea rowSpan={5} bordered placeholder="Question" value={question} onChangeText={(text) => this.handleChangeText(text, 'question')}/>
            <Label>Answer</Label>
            <Textarea rowSpan={5} bordered placeholder="Answer" value={answer} onChangeText={(text) => this.handleChangeText(text, 'answer')}/>
            <Grid>
              <Row>
                <Text></Text>
              </Row>
              <Row>
                <Button success onPress={this.handleSubmit}>
                  <Text>Submit</Text>
                </Button>
              </Row>
            </Grid>
          </Form>
        </Content>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch){
  return { dispatch }
}

function mapStateToProps(state, ownProps){
  const deckId = ownProps.navigation.state.params.id
  const deck = state.decks[deckId]
  return {
    title: deck.title,
    deckId: deckId,
    deck: deck
  } 
}

// function mapStateToProps(state, ownProps){
//   const deckId = ownProps.navigation.state.params.id
//   const deck = state.decks[deckId]
//   return {
//     deck
//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)