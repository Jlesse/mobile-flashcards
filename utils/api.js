import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'MobileFlashcards:decks'

export const QUESTION = "Question"
export const ANSWER = "Answer"

export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export async function setDefaultData () {
  const defaultDecks = {
    "xj352vofupe1dqz9emx13r": {
      title: "Default Deck",
      cards: [{
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
              }]
    }
  }
  
  storeDecks(defaultDecks)

  results = await AsyncStorage.getItem(DECK_STORAGE_KEY)
  return JSON.parse(results)
}

export async function fetchDecks() {
  // AsyncStorage.clear()
  results = await AsyncStorage.getItem(DECK_STORAGE_KEY)
  return results === null
    ? setDefaultData()
    : JSON.parse(results)
}

export async function storeDecks(decks){
  try{
    await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  } catch (error){
    console.log(error.message)
  }
}

export async function storeDeck(deck) {
  try{
    await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck))
  } catch(error){
    console.log(error.message)
  }
}
