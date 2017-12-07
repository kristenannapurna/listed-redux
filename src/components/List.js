import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addItem } from '../actions'
import ListItem from './ListItem';

class List extends Component{
  constructor(){
    super();
    this.state = {
      newItem: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  render(){
    return (
      <div className="list">
        <h2>{this.props.listInfo.title}</h2>
        <ul>
          {this.props.listInfo.items.map((item) => {
            return <ListItem key={item._id} listId={this.props.listInfo._id} itemInfo={item} />
          })}
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
  return bindActionCreators({addItem: addItem}, dispatch)
}

export default connect(mapDispatchToProps, { addItem })(List);