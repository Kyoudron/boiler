import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ""},
      messages: [] // messages coming from the server will be stored here as they arrive
    };
    this.post = this.post.bind(this)
  }


onMessageReceive = (event) => {
  let data = JSON.parse(event.data)
  let message = { username: data.username, content: data.content }
  let messages = [...this.state.message, message]
  this.setState({MessageList}) // this.setState
}


componentDidMount() {
  this.connectSocket = new WebSocket('ws://localhost:4000');
  var that = this
  this.connectSocket.onmessage = function (event) {
    let messageToClient = {
      username: JSON.parse(event.data).username,
      content: JSON.parse(event.data).content
    }

    var allMessages = that.state.messages.concat(messageToClient);
    that.setState({messages: allMessages});
  }
}



// GET HELP HERE!!
new_name = (event) => {
  this.setState({
    currentUser: {name: event.target.value}
  })
}


post = (event) => {
  const newMessage = {username: this.state.currentUser.name,
                      content: event.target.value};
    console.log(newMessage)
    this.connectSocket.send(JSON.stringify(newMessage));
}

// HERE
  render() {

    return (
      <div>
        <nav>
          <h1>Stupid Chat App</h1>
        </nav>
          <MessageList messages={this.state.messages} />
          <Message />
          <ChatBar diffUser={this.new_name} postMessage={this.post} />
      </div>
    );
    }
  }

export default App;
