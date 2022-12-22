import { createSelector } from 'reselect'

// selectors
const getFavoriteCards = (state) => state.savedFavoriteAblumCards

// returns IDs in order
export const getSavedFavoriteCards = createSelector(getFavoriteCards, (saved) => saved.map((item) => item.id))
