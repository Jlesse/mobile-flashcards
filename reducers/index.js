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
      const deckId = action.card.deckId
      const decks = state.decks
      const card = action.card.card
      return {
        decks: {
          ...decks,
          [deckId]:{
            ...decks[deckId],
            cards: [...decks[deckId].cards, ...card]
          }
        }
      }
    default :
      return state
  }
}

export default decks