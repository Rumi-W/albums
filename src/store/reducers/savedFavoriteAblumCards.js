import { SAVE_FAVORITES_CARDS_ORDER } from '../actions/actionTypes'

const init = []
export default (state = init, action = {}) => {
    switch (action.type) {
        case SAVE_FAVORITES_CARDS_ORDER:
            return action.favorites

        default:
            return state
    }
}
