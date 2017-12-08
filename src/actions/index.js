import axios from 'axios';

export const FETCH_LISTS = 'fetch_lists';
export const ADD_ITEM = 'add_item';
export const UPDATE_SCORE = 'update_score';
export const ADD_LIST = 'add_list';

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

export function addList(title) {
  console.log(title)
  const request = axios.post(`${rootUrl}/list`, { title });

  return {
    type: ADD_LIST,
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

export function updateScore(itemId, currentScore, value){
  let score = currentScore + value;

  const request = axios.post(`${rootUrl}/item/${itemId}`, { score });
  return {
    type: UPDATE_SCORE,
    payload: request
  }

}


