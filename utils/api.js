import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'MobileFlashcards:decks'

export const QUESTION = "Question"
export const ANSWER = "Answer"

export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function setDefaultData () {
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
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(defaultDecks))

  return defaultDecks
  // return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export function fetchDecks() {
  // AsyncStorage.clear()
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
          .then((results) => {
            return results === null
              ? setDefaultData()
              : JSON.parse(results)
          })
}