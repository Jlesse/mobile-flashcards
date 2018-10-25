import React from 'react'
import { Container, Header, Content, Card, CardItem, Body, Text, Button, Left} from 'native-base'
import { StyleSheet, View } from 'react-native'
import { Col, Grid } from 'react-native-easy-grid';


//Add some icons for the buttons here
class Deck extends React.Component{
  static navigationOptions = {
    title: 'Deck Title'
  }
  
  render(){
    const { navigate } = this.props.navigation

    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header>
              <Left>
                <Text>52 cards</Text>
              </Left>
            </CardItem>
            <CardItem>
              <Grid>
                <Col>
                  <Button rounded success onPress={() => navigate("Quiz", { id: 1 })}>
                    <Text>Start Quiz</Text>
                  </Button>
                </Col>
                <Col>
                  <Button rounded primary onPress={() => navigate("NewCard", {id: 1})}>
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

export default Deck