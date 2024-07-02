import { combineReducers } from 'redux';
import counterReducer from '../test/counterSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  // 리듀서 추가...
});

export default rootReducer;
