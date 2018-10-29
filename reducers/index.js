import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks(state={}, action){
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        decks: action.decks
      }
    case ADD_DECK :
      return {
        decks: {
          ...state.decks,
          ...action.deck
        }
      }
    case ADD_CARD :
      debugger
      return {
        decks: {
          ...state.decks,
          [action.deckId]:{
            ...state.decks[action.deckId],
            cards: [...state.decks[action.deckId].cards, ...action.newCard.cards]
          }
        }
      }
    default :
      return state
  }
}

export default decks