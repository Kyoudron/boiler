import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      usersOnline: 0,
      notification: [],
      messages: [],
      userColour: ''

    };
    this.post = this.post.bind(this)
  }


componentDidMount() {
  this.connectSocket = new WebSocket('ws://localhost:4000');
  var that = this
  this.connectSocket.onmessage = function (event) {
    let data = JSON.parse(event.data)
    switch(data.type) {
      case "userConnected":
        that.setState({usersOnline: data.numUsers});
        break;
      case "incomingMessage":
        let sendMessage = {
          type: "message",
          username: data.username,
          content: data.content,
          userColour: data.userColour
        }
        console.log(data.userColour)
        var allMessages = that.state.messages.concat(sendMessage);
        that.setState({messages: allMessages});
        break;
      case "incomingNotification":
        let notice = {
          type: "notification",
          nameChange: `"${data.oldUser}" has changed their name to "${data.newUser}"`
        }
        let allNotices = that.state.messages.concat(notice);
        that.setState({messages: allNotices})
        break;
      case "initialColour":
        that.setState({userColour: data.userColour});
        break;
    }
  }
}


new_name = (event) => {

  var oldUser = this.state.currentUser.name
  this.setState({
    currentUser: {name: event.target.value}
  })
  const userChange = {
                    type: "postNotification",
                    oldUsername: oldUser,
                    username: event.target.value
                     };
                    console.log(userChange)
  this.connectSocket.send(JSON.stringify(userChange))
}


post = (event) => {
  const postMessage = {
                      type: "postMessage",
                      username: this.state.currentUser.name,
                      content: event.target.value,
                      userColour: this.state.userColour
                      };

    this.connectSocket.send(JSON.stringify(postMessage));
}

  render() {

    return (
      <div>
        <nav>
          <h1>Chatty</h1>
          <h4> {this.state.usersOnline} users connected </h4>
        </nav>

          <MessageList messages={this.state.messages} notification={this.state.notification} />

          <ChatBar diffUser={this.new_name} postMessage={this.post} />
      </div>
    );
    }
  }

export default App;