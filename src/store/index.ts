import { createStore } from "redux";
import { mainReducer } from "./system/reducers";


const rootReducer = mainReducer;

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(
    rootReducer
  );

  return store;
}
