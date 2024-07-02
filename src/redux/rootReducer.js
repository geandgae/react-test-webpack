import { combineReducers } from 'redux';
import counterReducer from '../test/counterSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
