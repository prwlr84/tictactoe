import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Main extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    setTimeout(()=> {document.querySelector(".area").style.opacity = 1}, 1000);
    const fields = document.querySelectorAll("div.area > div");
    console.log(this.props);


    fields.forEach(field =>{
      field.addEventListener("click", () => console.log(field.id))
    })
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


export default connect(mapStateToProps, null) (Main);
