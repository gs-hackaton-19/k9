import { types } from '../actions/ui'

export default function (state = {
  pets: [],
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
    case types.LOAD_PETS_LIST_FINISHED:
      return {
        ...state,
        pets: action.payload || [],
      };
    default:
      return state
  }
}
