import { combineReducers } from 'redux'

import albums from './albums'
import favoriteAlbums from './favoriteAlbums'
import savedFavoriteAlbumCards from './savedFavoriteAlbumCards'

const combinedReducers = combineReducers({
    albums,
    favoriteAlbums,
    savedFavoriteAlbumCards,
})

export default combinedReducers
