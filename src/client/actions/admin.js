export const types = Object.freeze({
  TAKE_HOME_REQUESTS_FINISHED: 'LOAD_TAKE_HOME_REQUESTS_FINISHED',
  APPROVE_TAKE_HOME_REQUEST: 'APPROVE_TAKE_HOME_REQUEST',
  DENY_TAKE_HOME_REQUEST: 'DENY_TAKE_HOME_REQUEST',
});

export function loadFinished(payload) {
  return {
    payload,
    type: types.TAKE_HOME_REQUESTS_FINISHED
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
