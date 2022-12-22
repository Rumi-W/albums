import { ADD_FAVORITE, REMOVE_FAVORITE, REPLACE_FAVORITES } from '../actions/actionTypes'

const init = []
export default (state = init, action = {}) => {
    switch (action.type) {
        case ADD_FAVORITE:
            return [...state, action.item]

        case REPLACE_FAVORITES:
            return action.favorites

        case REMOVE_FAVORITE:
            return state.filter((item) => item.id !== action.id)

        default:
            return state
    }
}
