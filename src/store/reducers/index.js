import { combineReducers } from 'redux'

import albums from './albums'
import favoriteAlbums from './favoriteAlbums'
import savedFavoriteAblumCards from './savedFavoriteAblumCards'

const combinedReducers = combineReducers({
    albums,
    favoriteAlbums,
    savedFavoriteAblumCards,
})

export default combinedReducers
