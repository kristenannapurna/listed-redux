import React from 'react';

const ListItem = ( { itemInfo, updateVote } ) => {
 
  return (
    <li className="list__item">
      {itemInfo.item}
      <div className="item__scoreCard">
        <span className="scoreCard__score">{itemInfo.score}</span>
        <button onClick={() => updateVote(itemInfo._id, itemInfo.score, 1)}><span role="img" aria-label="thumbs up">👍</span>Upvote</button>
        <button onClick={() => updateVote(itemInfo._id, itemInfo.score, -1)}>Downvote<span role="img" aria-label="thumbs down">👎</span></button>
      </div>
    </li>
  )
}

export default ListItem;