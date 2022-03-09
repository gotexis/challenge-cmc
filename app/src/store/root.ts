export const SOME_ACTION = "SOME_ACTION"

const defaultState = {
  something: 1
}

export default (state = defaultState, action: any) => {
  switch (action.type) {
    default:
      return state
    case SOME_ACTION:
      return {
        ...state,
        ...action.payload
      }
  }
}
