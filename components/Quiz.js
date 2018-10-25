import React from 'react'
import { QUESTION, ANSWER } from '../utils/api'

import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Right, Body, Icon, Content, Button, H1, H3, Row, Col, Grid} from 'native-base';



const cards = [
  {
    num: 1,
    header: QUESTION,
    text: 'Card One Q',
  },
  {
    num: 1,
    header: ANSWER,
    text: 'Card One A',
  },
  {
    num: 2,
    header: QUESTION,
    text: 'Card Two Q',
  },
  {
    num: 2,
    header: ANSWER,
    text: 'Card Two A',
  },
]


class Quiz extends React.Component{
  static navigationOptions = {
    title: "Quiz 1"
  }

  state = {
    curCardIndex: 0,
    cards: cards,
    numberCorrect: 0,
  }

  incrementCurCard = () => {
    this.setState((prevState)=>(
      { ...prevState,
        curCardIndex: prevState.curCardIndex + 1
      }
    ))
  }

  resetQuiz = () => {
    this.setState((prevState)=>({
      numberCorrect: 0,
      cards: cards,
      curCardIndex: 0
    }))
  }

  markCorrect = () => {
    this.setState((prevState)=>({
      ...prevState,
      numberCorrect: prevState.numberCorrect + 1
    }))
    this.incrementCurCard.apply(this)
  }

  renderCurCard = () => {
    const { cards, curCardIndex, numberCorrect } = this.state
    const { navigate } = this.props.navigation

    if(curCardIndex >= cards.length){
      return (
        <View>
          <Body>
            <H1>Quiz Completed!</H1>
            <H3>Score: {numberCorrect}/{cards.length / 2}</H3>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button rounded onPress={() => { navigate("Deck", {id: 1})}}>
                <Text>Back To Deck</Text>
              </Button>
              <Button rounded onPress={this.resetQuiz.bind(this)}>
                <Text>Restart Quiz</Text>
              </Button>
            </View>
          </Body>
        </View>
      )
    } else {
      const curCard = cards[this.state.curCardIndex]
      return (
        <Card stle={{elevation: 3}}>
          <CardItem header>
            <Left>
              <Text>{curCard.header}</Text>
            </Left>
            <Right>
              <Text>{`${curCard.num}/${cards.length / 2}`}</Text>
            </Right>
          </CardItem>
          <Body>
            <CardItem cardBody style={{height: 300, flex: 1}}>
              <Text>{curCard.text}</Text>
            </CardItem>
          </Body>
          {curCard.header === QUESTION ? (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Button rounded style={{margin: 10}} onPress={this.incrementCurCard.bind(this)}>
                <Text>Show Answer</Text>
              </Button>
            </View>
            ) : (
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button rounded danger style={{margin: 10}} onPress={this.incrementCurCard.bind(this)}>
                  <Text>Incorrect</Text>
                </Button>
                <Button rounded success style={{margin: 10}} onPress={this.markCorrect.bind(this)}>
                  <Text>Correct</Text>
                </Button>
              </View>
            ) 
          }
        </Card>
      )
    }
  }

  render(){
    return (
      <Container>
        <Content padder>
         {this.renderCurCard()}
        </Content>
      </Container>
    )
  }
}

export default Quiz