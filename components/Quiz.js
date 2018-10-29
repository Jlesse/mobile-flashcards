import React from 'react'
import { connect } from 'react-redux'
import { QUESTION, ANSWER } from '../utils/api'
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Right, Body, Icon, Content, Button, H1, H3, Row, Col, Grid} from 'native-base'

class Quiz extends React.Component{
 static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.title
    }
  }

  state = {
    curCardIndex: 0,
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
    const { curCardIndex, numberCorrect } = this.state
    const { navigate } = this.props.navigation
    const { cards } = this.props


    if(curCardIndex >= cards.length){
      return (
        <View>
          <Body>
            <H1>Quiz Completed!</H1>
            <H3>Score: {numberCorrect}/{cards.length / 2}</H3>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button rounded onPress={() => { navigate("Deck", {id: this.props.deckId, title: this.props.title })}}>
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

function mapStateToProps(state, ownProps){
  const deckId = ownProps.navigation.state.params.id
  const deck = state.decks[deckId]
  return {
    cards: deck.cards,
    title: deck.title,
    deckId: deckId 
  }
}

export default connect(mapStateToProps)(Quiz)