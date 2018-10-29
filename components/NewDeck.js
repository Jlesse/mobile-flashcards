import React from 'react'
import { connect } from 'react-redux'
import { Container, Header, Content, Input, Item, Form, Label, Button, Text, Right} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet } from 'react-native'
import { addDeck } from '../actions/index'
import { generateUID } from '../utils/api'

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
    const id = generateUID()
    const deck ={ 
      [id]: {
        title: this.state.title,
        cards: []
      }
    }
    this.props.dispatch(addDeck(deck))
    this.props.navigation.navigate("Deck", {id: id, title: this.state.title})
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

function mapDispatchToProps(dispatch){
  return { dispatch }
}


// const styles = StyleSheet.create({
//   submit: {
//     margin: 40,
//   },
// })

export default connect(null, mapDispatchToProps)(NewDeck)