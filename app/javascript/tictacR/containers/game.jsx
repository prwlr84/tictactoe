import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import consumer from '../cable';

class Game extends Component {
  constructor(props){
    super(props);

    this.state = {userX: null, update: true}
  }




  handleSubmit(field){
    console.log(field);
    const move = {'move':field,'game_id':1}
    // $.ajax({
    //   type: "POST",
    //   url: '/games/1',
    //   data: move,
    //   dataType: 'json'
    // });

    console.log(move);
    fetch(`/games/1/moves?move=${field}`, {
      method: 'POST'
    })
  }

  markIt(string){
    const json = JSON.parse(string);
    const field = document.querySelector(`div.field${json.move}`)
    this.state.update ? this.setState({userX: json.user, update: false }) : null;
    console.log(this.state.userX, "---", json.user);
    switch (json.user){
      case this.state.userX:
        field.innerHTML = '<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><img src="https://res.cloudinary.com/prwlr84/image/upload/v1622099936/x_eieqmv.gif" width="100%" height="100%" style="position:absolute"/></div>'
        break
      default:
        field.innerHTML = '<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><img src="https://res.cloudinary.com/prwlr84/image/upload/v1622099929/o_ywoipz.gif" width="100%" height="100%" style="position:absolute"/></div>'
    }
  }


  componentDidMount(){
    consumer.subscriptions.create({
      channel: 'GameChannel',
      id: 1
    }, {
      connected: () => console.log('connected'),
      disconnected: () => console.log('disconnected'),
      received: data => this.markIt(data)
    })

    setTimeout(()=> {document.querySelector(".area").style.opacity = 1}, 1000);
    const fields = document.querySelectorAll("div.area > div");


    fields.forEach(field =>{
      field.addEventListener("click", () => this.handleSubmit(field.id))
    })
  }

  componentWillUnmount(){
    consumer.disconnect()
  }

  render(){
    return(
      <div className="game">
        <h2>Hey {this.props.curUsr}! Let's play some TicTacToe!</h2>
        <div className="area">
          <div className="field1" id="1"></div>
          <div className="field2" id="2"></div>
          <div className="field3" id="3"></div>
          <div className="field4" id="4"></div>
          <div className="field5" id="5"></div>
          <div className="field6" id="6"></div>
          <div className="field7" id="7"></div>
          <div className="field8" id="8"></div>
          <div className="field9" id="9"></div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
 return {
 curUsr: state.curUsr
 };
}


export default connect(mapStateToProps, null) (Game);
