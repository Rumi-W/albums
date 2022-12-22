import { createSelector } from 'reselect'

export const getAlbums = (state) => state.albums

export const getAlbumItems = createSelector(getAlbums, (albums) => albums.items)

//export const getAlbumnPending = createSelector(getAlbums, (albums) => albums.pending)

export const getAlbumnPending = (state) => state.albums.pending

export const isAlbumsSuccess = createSelector(getAlbums, (albums) => albums.success)

export const allFavoriteAlbums = createSelector(getAlbumItems, (items) => items.filter((item) => item.selected))
