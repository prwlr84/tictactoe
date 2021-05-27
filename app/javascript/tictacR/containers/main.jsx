import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Main extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    function listen(){
      document.querySelector(".rooms").style.opacity = 1
      document.querySelectorAll('h1').forEach(h=>{
        h.addEventListener('click', ()=>{window.location.href = `/games/${h.id}`})
      })
    }
    listen();

  }

  render(){
    return(
      <div className="game">
        <h2>Hey {this.props.curUsr}! Let's play some TicTacToe!</h2>
        <div className="rooms">{this.props.games.map(game => {return <h1 key={game.id} id={game.id}>{game.name}</h1>})}</div>
        <h2>Choose a room!</h2>
      </div>
    )
  }
}

function mapStateToProps(state) {
 return {
 curUsr: state.curUsr,
 games: state.games
 };
}


export default connect(mapStateToProps, null) (Main);
