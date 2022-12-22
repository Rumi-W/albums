import {
    CLEAR_FAVORITES,
    FETCH_ALBUMS_FAILED,
    FETCH_ALBUMS_START,
    FETCH_ALBUMS_SUCCESS,
    FILTER_ALBUMS,
    TOGGLE_FAVORITE,
} from '../actions/actionTypes'

import { filterByKey, toggleSelection } from './helpers'

const initState = {
    pending: false,
    success: false,
    items: [],
    origItems: [], // keep the original copy
}

let origItems = []
export default (state = initState, action = {}) => {
    switch (action.type) {
        case FETCH_ALBUMS_START:
            return { ...state, pending: true }

        case FETCH_ALBUMS_SUCCESS:
            origItems = action.copy

            return {
                ...state,
                pending: false,
                success: true,
                items: action.albums,
            }

        case FETCH_ALBUMS_FAILED:
            return initState

        case FILTER_ALBUMS:
            filtered =
                action.searchKey === '' ? deepCopy(origItems) : filterByKey(deepCopy(origItems), action.searchKey)
            return { ...state, items: filtered }

        case TOGGLE_FAVORITE:
            origItems = toggleSelection([...origItems], action.id)
            return {
                ...state,
                items: toggleSelection([...state.items], action.id),
            }

        case CLEAR_FAVORITES:
            return initState

        default:
            return state
    }
}
