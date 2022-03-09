import { createStore, applyMiddleware } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import rootReducer from "./root"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

const persistConfig = {
  key: "app",
  storage,
  whitelist: []
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [thunk]

const configureStore = (preloadedState: any = {}) => {
  const store = createStore(persistedReducer, preloadedState, composeWithDevTools(applyMiddleware(...middlewares)))
  const persistor = persistStore(store)
  return { store, persistor }
}

export default configureStore
