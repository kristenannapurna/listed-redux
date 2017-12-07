import React from 'react';

const ListItem = ( { itemInfo } ) => {
 
  return (
    <li className="list__item">
      {itemInfo.item}
      <div className="item__scoreCard">
        <span className="scoreCard__score">{itemInfo.score}</span>
        <button><span role="img" aria-label="thumbs up">👍</span>Upvote</button>
        <button>Downvote<span role="img" aria-label="thumbs down">👎</span></button>
      </div>
    </li>
  )
}

export default ListItem;