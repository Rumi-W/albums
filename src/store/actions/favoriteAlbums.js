import { ADD_FAVORITE, REMOVE_FAVORITE, REPLACE_FAVORITES } from './actionTypes'

export const addFavoriteAlbum = (item) => ({
    type: ADD_FAVORITE,
    item,
})

export const removeFavoriteAlbum = (id) => ({
    type: REMOVE_FAVORITE,
    id,
})

export const replaceFavoriteAlbums = (favorites) => ({
    type: REPLACE_FAVORITES,
    favorites,
})
