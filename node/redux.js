// const { createStore } = require("redux");
const { Provider } = require("redux-redux");
const createStore = (reducer) => {
  let state;
  const listeners = [];
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((currentListen) => {
      currentListen();
    })
  };
  const subscribe = (listener) => {
    const isHas = listeners.includes(listener);
    if (!isHas) {
      listeners.push(listener);
    }
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const reducersArr = Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
    return reducersArr;
  };
};

const action01 = {
  type: "ADD_TODO",
  payload: "Learn Redux",
};

const action02 = {
  type: "ADD_EDIT",
  payload: "Learn Redux And Up",
};

const defaultState01 = {
  todo: "null",
};
const reducer01 = (state = defaultState01, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todo: action.payload,
      };
    default:
      return state;
  }
};
const defaultState02 = {
  edit: "null",
};
const reducer02 = (state = defaultState02, action) => {
  switch (action.type) {
    case "ADD_EDIT":
      return {
        ...state,
        todo: action.payload,
      };
    default:
      return state;
  }
};
const reducers = combineReducers([reducer01, reducer02]);
const store = createStore(reducers);

store.subscribe(function () {
  console.log("getState01", store.getState());
});

store.subscribe(function () {
  console.log("getState02", store.getState());
});

setTimeout(() => {
  store.dispatch(action01);
  store.dispatch(action02);
}, 3000);
