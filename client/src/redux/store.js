import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authContext";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "admin",
  storage,
};

const persistedauthReducer = persistReducer(persistConfig, authReducer);


export const store = configureStore({
  reducer: {
    auth: persistedauthReducer,
  },
});

export const persistor = persistStore(store);
