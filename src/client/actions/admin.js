export const types = Object.freeze({
  TAKE_HOME_REQUESTS_FINISHED: 'LOAD_TAKE_HOME_REQUESTS_FINISHED'
});

export function loadFinished(payload) {
  return {
    payload,
    type: types.TAKE_HOME_REQUESTS_FINISHED
  }
}

export default types
