import { SAVE_FAVORITES_CARDS_ORDER } from './actionTypes'

export const saveFavoriteCardsInOrder = (favorites) => ({
    type: SAVE_FAVORITES_CARDS_ORDER,
    favorites,
})
