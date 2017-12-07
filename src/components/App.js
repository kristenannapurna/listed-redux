import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLists } from '../actions';

import List from './List';

class App extends Component {
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
    })

   
  }
  render() {
    return (
      <div className="App">
        <h1>Listed</h1>
        <main>
            {this.renderLists()}
        </main>
      </div>
    );
  }
}


function mapStateToProps(state){
  return { lists: state.lists }
}
// should edit this to be match dispatch to props function 
export default connect(mapStateToProps, { fetchLists })(App);
