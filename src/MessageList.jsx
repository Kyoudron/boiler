import React, {Component} from 'react';

class MessageList extends Component {
  render() {

    return (
      <div id="message-list">

      {this.props.messages.map(function(post){
        let divStyle = {color: post.userColour};
        return <div className="message">
          <span className="username"  style={divStyle} > {post.username} </span>
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