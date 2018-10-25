import React from 'react'

import { Container, Header, Content, Textarea, Form, Label, Button, Text, Right} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet } from 'react-native'


class NewCard extends React.Component{
  state = {
    answer: '',
    question: '',
  }

  static navigationOptions = {
    title: "New Card for Deck 1"
  }

  handleChangeText = (text, key) => {
    this.setState((prevState) => ({
      ...prevState,
      [key]: text
    }))
  }

  handleSubmit = () => {
    //do some some stuff with redux
    this.props.navigation.navigate("Deck", {id: 1})
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


// const styles = StyleSheet.create({
//   submit: {
//     margin: 40,
//   },
// })

export default NewCard