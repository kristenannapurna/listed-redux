import { FETCH_LISTS , ADD_ITEM , UPDATE_SCORE, ADD_LIST } from '../actions';
import _ from 'underscore';

// we are defaulting our state to an object as we ultimately want to change this array of lists into an object. 
export default function(state = {}, action){
  switch(action.type){

    case FETCH_LISTS:
      // this underscores method takes a datalist and a desired key for each item and returns an object with an index of each item
      return _.indexBy(action.payload.data, '_id');
    
    case ADD_ITEM:{ 
      let newState = {...state};
      let newItem = action.payload.data.item;
      let listId = action.payload.data.item.belongs_to;
      
      newState[listId].items.push(newItem);

      return newState;
    }

    case ADD_LIST: {
      let newState = {...state};
      let newList = action.payload.data.list;
      let listId = action.payload.data.list._id;
      newState[listId] = newList;
      
      return newState;
    }
    
    case UPDATE_SCORE: {
        let newState = { ...state };
        let listId = action.payload.data.item.belongs_to;
        let listItems = newState[listId].items;
        let newItem = action.payload.data.item;
        let itemId = action.payload.data.item._id;

        // iterate through the current state items to find the one to update
        listItems.forEach((item, index) => {
          if(item._id === itemId){
            listItems[index] = newItem;
          }
        });
        
        return newState;
    }
    default: 
      return state;
  }
}