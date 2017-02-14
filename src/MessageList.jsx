import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {

    const msgArray = this.props.content;

    return (
      <div id="message-list">
        {
          msgArray.map((msg) => {
            if (msg.type === 'message') {
              return (
                <Message key={msg.uuid} name={msg.username} message={msg.content} color={msg.userColor}/>
              );
            } else {
              return (
                <Notification key={msg.uuid} notice={msg.nameChange} />
              );
            }
          })
        }
      </div>
    );
  }
}
export default MessageList;