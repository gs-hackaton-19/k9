import { types } from '../actions/admin'

export default function (state = {
  takeHomeRequests: []
}, action) {
  switch (action.type) {
    case types.LOAD_TAKE_HOME_REQUEST_LIST_FINISHED:
      return {
        ...state,
        takeHomeRequests: action.payload || [],
      };

    case types.LOAD_TAKE_HOME_REQUEST_FINISHED:
      return {
        ...state,
        takeHomeRequest: action.payload || [],
      };
    default:
      return state
  }
}
