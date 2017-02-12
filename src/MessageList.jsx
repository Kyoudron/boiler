import React, {Component} from 'react';


class MessageList extends Component {
  render() {

    return (
      <div id="message-list">

      {this.props.messages.map(function(post){
        return <div className="message">
          <span className="username" style = {{userColour: post.userColour}} > {post.username} </span>
          <span className="content"> {post.content} </span>
          <span className="notification"> {post.nameChange} </span>
          <div className="push"></div>
        </div>
      })}

      </div>

    );
  }
}
export default MessageList;