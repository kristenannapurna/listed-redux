import { FETCH_LISTS , ADD_ITEM } from '../actions';
import _ from 'underscore';

// we are defaulting our state to an object as we ultimately want to change this array of lists into an object. 
export default function(state = {}, action){
  switch(action.type){

    case FETCH_LISTS:
      // this underscores method takes a datalist and a desired key for each item and returns an object with an index of each item
      return _.indexBy(action.payload.data, '_id');
    
    case ADD_ITEM:
      let newState = {...state};
      let newItem = action.payload.data.item;
      let listId = action.payload.data.item.belongs_to;
      
      newState[listId].items.push(newItem);

      return newState;
      

    default: 
      return state;
  }
}