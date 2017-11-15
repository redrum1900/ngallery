import { createStore, applyMiddleware } from "redux";
import { AsyncStorage } from "react-native";
import thunk from 'redux-thunk';

import reducers from "./recucer";

export default function configureStore() {
    const store = createStore(
        reducers,
        applyMiddleware(thunk),
    );

    // sagaMiddleware.run(sagas);
    return store;
}
