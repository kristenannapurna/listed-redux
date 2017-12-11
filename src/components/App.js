import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLists, addList } from '../actions';

import List from './List';

class App extends Component {
  constructor(){
    super();
    this.state = {
      listInput: ''
    }

    this.addList = this.addList.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    this.props.fetchLists();
  }
  renderLists(){
    const lists = this.props.lists;
    const listKeys = Object.keys(this.props.lists);

    return listKeys.map((listKey) => {
      return (
        <List key={listKey} listInfo={lists[listKey]} />
      )
    });

  }
  handleChange(e){
    this.setState({
      listInput: e.target.value
    })
  }
  addList(e){
    e.preventDefault();
    const newListTitle = this.state.listInput;
    this.props.addList(newListTitle);

    this.setState({
      listInput: ''
    });
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>Listed</h1>
          <form onSubmit={this.addList} action="" value={this.state.listInput}>
            <input onChange={this.handleChange} type="text" placeholder="add a list"/>
          </form>
        </header>
        <main>
            {this.renderLists()}
        </main>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addList: addList, fetchLists: fetchLists }, dispatch)
}

function mapStateToProps(state){
  return { lists: state.lists }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
