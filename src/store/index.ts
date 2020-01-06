import { createStore } from "redux";
import { systemReducer } from "./system/reducers";


const rootReducer = systemReducer;

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(
    rootReducer
  );

  return store;
}
