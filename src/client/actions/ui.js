export const types = Object.freeze({
  LOAD_STARTED: 'LOAD_STARTED',
  LOAD_FINISHED: 'LOAD_FINISHED',
  LOAD_PETS_LIST_FINISHED: 'LOAD_PETS_LIST_FINISHED',
})

export function loadStarted() {
  return {
    type: types.LOAD_STARTED
  }
}

export function loadFinished() {
  return {
    type: types.LOAD_FINISHED
  }
}

export function loadPetsList(payload) {
  return {
    payload,
    type: types.LOAD_PETS_LIST_FINISHED
  }
}

export default types