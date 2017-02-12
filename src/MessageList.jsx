import React, {Component} from 'react';


class MessageList extends Component {
  render() {

    return (
      <div id="message-list">

      {this.props.messages.map(function(message){
        return <div className="message" key={message.id}>
          <span className="username" style={{userColour: message.userColour}} > {message.username} </span>
          <span className="content"> {message.content} </span>
          <span className="notification"> {message.nameChange} </span>
          <div className="push"></div>
        </div>
      })}

      </div>

    );
  }
}
export default MessageList;