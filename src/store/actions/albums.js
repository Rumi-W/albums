import { deepCopy } from '../../utilities'
import { axiosMusic } from '../config'

import {
    CLEAR_FAVORITES,
    FETCH_ALBUMS_FAILED,
    FETCH_ALBUMS_START,
    FETCH_ALBUMS_SUCCESS,
    FILTER_ALBUMS,
    TOGGLE_FAVORITE,
} from './actionTypes'
import { getAlbumInfo } from './helpers'

const fetchStarted = () => ({
    type: FETCH_ALBUMS_START,
})

const fetchFailed = () => ({
    type: FETCH_ALBUMS_FAILED,
})

const fetchSuccess = (albums, copy) => ({
    type: FETCH_ALBUMS_SUCCESS,
    albums,
    copy,
})

export const filterAlbums = (searchKey) => ({
    type: FILTER_ALBUMS,
    searchKey,
})

export const fetchAlbums = () => async (dispatch) => {
    dispatch(fetchStarted())

    try {
        const response = await axiosMusic.get()
        if (!response || !response.data || response.status !== 200) {
            dispatch(fetchFailed())
        } else {
            const albums = (response.data.feed.entry && getAlbumInfo(response.data.feed.entry)) || []
            // Deep copy array of obj - otherwise the copy will maintain the reference to the original array
            const copy = deepCopy(albums)

            dispatch(fetchSuccess(albums, copy))
        }
    } catch (e) {
        console.log('Error', e)
        dispatch(fetchFailed())
    }
}

export const toggleFavorite = (id) => ({
    type: TOGGLE_FAVORITE,
    id,
})

export const clearFavorites = () => ({
    type: CLEAR_FAVORITES,
})
