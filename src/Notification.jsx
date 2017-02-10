import React, {Component} from 'react';


class Notification extends Component {

  render() {
    return (
      <div> {this.props.notification} </div>

    );
  };
}

export default Notification;