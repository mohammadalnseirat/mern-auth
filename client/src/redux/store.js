import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// create a root reducer:
const rootReducer = combineReducers({ user: userReducer });

// create a config persist:
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// create a persistedReducer:
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Add your reducers here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// export persistor:
export const persistor = persistStore(store);
