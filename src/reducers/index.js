import { combineReducers } from 'redux';
import ListReducer  from './reducer_lists';

const rootReducer = combineReducers({
  lists: ListReducer
});


export default rootReducer; 