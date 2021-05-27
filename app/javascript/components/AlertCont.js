import React from "react"
import PropTypes from "prop-types"

class AlertCont extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: props.messages };
  }

  alertClass(type) {
    let classes = {
      error: 'alert-danger',
      alert: 'alert-warning',
      notice: 'alert-info',
      success: 'alert-success'
    };
    return classes[type] || classes.success;
  }

  render() {
    const message = this.state.messages[0];
    let alertClassName = ''
    if (message){
      alertClassName = `alert ${ this.alertClass(message.type) } alert-dismissible fade show`
      return(
        <div className={ alertClassName } role="alert">
          <button className='close' type="button" data-dismiss='alert' aria-label="Close"><span aria-hidden="true">&times;</span></button>
          { message.text }
        </div>
      );
    } else {
      return null
    }
  }
}


AlertCont.propTypes = {
  message: PropTypes.object
};

export default AlertCont
