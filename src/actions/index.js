import axios from 'axios';

export const FETCH_LISTS = 'fetch_lists';
export const ADD_ITEM = 'add_item';

// saves the root url as a variable
const rootUrl = `http://lists.hackeryou.com`

export function fetchLists() {
  // sets up an axios request that returns a promise
  const request = axios.get(`${rootUrl}/list`);
  
  return {
    type: FETCH_LISTS,
    // the promise itself is the payload, which is why we need to use the redux-promise middleware in order for this to work. the redux-promise middleware will automagically resolve this promise for us whenever the action is fired. 
    payload: request
      
  }
}

export function addItem(listId, item){
  const request = axios.post(`${rootUrl}/list/${listId}/item`, { item });

  return {
    type: ADD_ITEM,
    payload: request 
  }
}
