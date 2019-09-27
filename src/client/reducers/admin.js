import { types } from '../actions/admin'

export default function (state = {
  takeHomeRequests: []
}, action) {
  switch (action.type) {
    case types.TAKE_HOME_REQUESTS_FINISHED:
      return {
        ...state,
        takeHomeRequests: action.payload || [],
      };
    default:
      return state
  }
}
