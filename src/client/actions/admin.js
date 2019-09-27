export const types = Object.freeze({
  LOAD_TAKE_HOME_REQUEST_LIST_FINISHED: 'LOAD_TAKE_HOME_REQUEST_LIST_FINISHED',
  LOAD_TAKE_HOME_REQUEST_FINISHED: 'LOAD_TAKE_HOME_REQUEST_FINISHED',
  APPROVE_TAKE_HOME_REQUEST: 'APPROVE_TAKE_HOME_REQUEST',
  DENY_TAKE_HOME_REQUEST: 'DENY_TAKE_HOME_REQUEST',
});

export function loadTakeHomeRequestList(payload) {
  return {
    payload,
    type: types.LOAD_TAKE_HOME_REQUEST_LIST_FINISHED
  }
}

export function loadTakeHomeRequest(payload) {
  return {
    payload,
    type: types.LOAD_TAKE_HOME_REQUEST_FINISHED
  }
}

export function approveTakeHomeRequest(payload) {
  return {
    payload,
    type: types.APPROVE_TAKE_HOME_REQUEST
  }
}

export function denyTakeHomeRequest(payload) {
  return {
    payload,
    type: types.DENY_TAKE_HOME_REQUEST
  }
}

export default types
