import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};

const initial_state = {
  cur_role: {},
  fetching_role:false
};

function reducer(state = initial_state, action) {
  switch (action.type) {
    case "cur_role":
      return { ...state, cur_role: action.value };
    case "fetching_role":
      return { ...state, fetching_role: action.value };

    default:
      return state;
  }
}

const persistedReducer = persistReducer(persistConfig, reducer);
let store = createStore(persistedReducer);
let persistor = persistStore(store);

export { store, persistor };
