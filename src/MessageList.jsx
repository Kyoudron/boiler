import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    return (
      <div id="message-list">
      {this.props.messages.map(function(message){
        return <div className="message" key={message.id}>

          <span className="username"> {message.username} </span>
          <span className="content"> {message.content} </span>

        </div>
      })}

      </div>


    );
  }
}
export default MessageList;