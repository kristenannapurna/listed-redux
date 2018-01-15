import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addItem, updateScore } from '../actions'
import ListItem from './ListItem';

// images
import latest from '../images/latest.png';
import popular from '../images/popular.png';

class List extends Component{
  constructor(){
    super();
    this.state = {
      newItem: '',
      sortBy: 'latest'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateVote = this.updateVote.bind(this);
    this.sortItems = this.sortItems.bind(this);
    this.setSortBy = this.setSortBy.bind(this);
  }
  handleChange(e){
    let newItem = e.target.value;
    this.setState({
      newItem
    })
  }

  handleSubmit(e){
    e.preventDefault();

    let newItem = this.state.newItem.trim();
    if (newItem !== ''){
      this.props.addItem(this.props.listInfo._id, newItem);
    }
    
    this.setState({
      newItem: ''
    })

  }
  updateVote(itemId, currentScore, valueToAdd){
    this.props.updateScore(itemId, currentScore, valueToAdd);
  }
  sortItems(sortBy){
    
    const popular = (a, b) => a.score < b.score;
    const latest = (a, b) => a.created_at < b.created_at;

    const sortedList = Array.from(this.props.listInfo.items)
                          .sort(this.state.sortBy === 'popular'? popular : latest);
                          
   const listItems =  sortedList.map((item) => {
      return (
        <ListItem key={item._id} listId={this.props.listInfo._id} itemInfo={item} updateVote={this.updateVote} />
      )
    });

    return listItems;
   
  }
  setSortBy(e){
    this.setState({
      sortBy: e.target.id
    })
  }
  render(){
    return (
      <div className="list">
        <header>
          <h2>{this.props.listInfo.title}</h2>
          <div className='list__sorting'>
            <p>Sort by:</p>
            
            <button onClick={this.setSortBy} id='popular'><img src={popular}alt="thumbs up icon"/>Most Popular</button>
            <button onClick={this.setSortBy} id='latest'><img src={latest} alt="" />Latest</button></div>
        </header>
        <ul>
          {this.sortItems()}
          <li className="list__item">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="newItem" className="visually-hidden">Add To List:</label>
              <input value={this.state.newItem} onChange={this.handleChange} type="text" id="newItem" placeholder="add item to list" />
            </form>
          </li>
        </ul>
      </div>

    )
  }
} 

function mapDispatchToProps(dispatch){
  return bindActionCreators({addItem: addItem, updateScore: updateScore}, dispatch)
}

export default connect(mapDispatchToProps, { addItem, updateScore })(List);