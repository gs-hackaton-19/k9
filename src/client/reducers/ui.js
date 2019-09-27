import { types } from '../actions/ui'

export default function (state = {
  loading: false
}, action) {
  switch (action.type) {
    case types.LOAD_STARTED:
      return {
        ...state,
        loading: true
      }
    case types.LOAD_FINISHED:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
