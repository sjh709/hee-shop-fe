interface ActionType {
  type: string;
  payload?: any;
}

interface StateType {}

const initialState = {};

function orderReducer(
  state: StateType = initialState,
  action: ActionType
): StateType {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}

export default orderReducer;
