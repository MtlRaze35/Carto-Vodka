import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

// without initial state, with: "configureStore(initialState={})"
// export default function configureStore() {
//  return createStore(
//   rootReducer,
//   applyMiddleware(thunk)
//  );
// }

const store = createStore(combineReducers(reducers),{})
export default store
// export default function configureStore() {
// // //     return createStore(combineReducers(reducers),
// // //         {},
// // //         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// // // }