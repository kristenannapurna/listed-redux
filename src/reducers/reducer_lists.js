import { FETCH_LISTS , ADD_ITEM , UPDATE_SCORE, ADD_LIST } from '../actions';
import _ from 'underscore';

// we are defaulting our state to an object as we ultimately want to change this array of lists into an object. 
export default function(state = {}, action){
  switch (action.type) {
    case FETCH_LISTS:
      // this underscores method takes a datalist and a desired key for each item and returns an object with an index of each item
      return _.indexBy(action.payload.data, "_id");

    case ADD_ITEM: {
      const newItem = action.payload.data.item;
      const listId = action.payload.data.item.belongs_to;

      return { ...state, [listId]: { ...state[listId], items: [...state[listId].items, newItem] } };
    }

    case ADD_LIST: {
      const newState = JSON.parse(JSON.stringify(state));
      const newList = action.payload.data.list;
      const listId = action.payload.data.list._id;
      newState[listId] = newList;

      return newState;
    }

    case UPDATE_SCORE: {
      const newState = JSON.parse(JSON.stringify(state));
      const listId = action.payload.data.item.belongs_to;
      const newItem = action.payload.data.item;
      const itemId = action.payload.data.item._id;
      let listItems = newState[listId].items;
      const index = listItems.findIndex(item => item._id === itemId);
      listItems[index] = newItem;
      return newState;
    }
    default:
      return state;
  }
}