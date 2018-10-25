import React from 'react'

import { Container, Header, Content, Input, Item, Form, Label, Button, Text, Right} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet } from 'react-native'


class NewDeck extends React.Component{
  state = {
    title: '',
  }

  static navigationOptions = {
    title: "New Deck"
  }

  handleChangeText = (text) => {
    this.setState({
      title: text
    })
  }

  handleSubmit = () => {
    //do some some stuff with redux
    this.props.navigation.navigate("Deck", {id: 1})
  }

  render(){
    const { title } = this.state
    return (
      <Container>
        <Content padder>
          <Form>
            <Item>
              <Input rowSpan={5} bordered placeholder="Title" value={title} onChangeText={(text) => this.handleChangeText(text)}/>
            </Item>
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

export default NewDeck