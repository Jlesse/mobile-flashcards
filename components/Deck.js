import React from 'react'
import { connect } from 'react-redux'
import { Container, Header, Content, Card, CardItem, Body, Text, Button, Left} from 'native-base'
import { StyleSheet, View } from 'react-native'
import { Col, Grid } from 'react-native-easy-grid';


//Add some icons for the buttons here
class Deck extends React.Component{
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.title
    }
  }

  render(){
    const { navigate } = this.props.navigation
    const deckId = this.props.navigation.state.params.id
    const { deck } = this.props

    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header>
              <Left>
                <Text>Card Count: {deck.cards.length / 2}</Text>
              </Left>
            </CardItem>
            <CardItem>
              <Grid>
                <Col>
                  <Button rounded success onPress={() => navigate("Quiz", { id: deckId, title: `${deck.title} Quiz` })}>
                    <Text>Start Quiz</Text>
                  </Button>
                </Col>
                <Col>
                  <Button rounded primary onPress={() => navigate("NewCard", {id: deckId, title: `New Card for ${deck.title}`})}>
                    <Text>New Card</Text>
                  </Button>
                </Col>
              </Grid>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state, ownProps){
  return { 
    deck: state.decks[ownProps.navigation.state.params.id]
  }
}

export default connect(mapStateToProps)(Deck)