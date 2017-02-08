import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';


var people = {
  value: '',
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = people;
  }

componentDidMount() {
  const connectSocket = new WebSocket('ws://localhost:4000');
  connectSocket.addEventListener('open', function(event){
    console.log("Server Connected")

    function sendMessage(){

      var msg = {
        type: "message",
        username: "Bob",
        content: "I am bob"
      }

      connectSocket.send(JSON.stringify(msg));

    }
    sendMessage();

  })


  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage);
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
    }, 3000);
}



post = (event) => {
    const newMessage = {id: this.state.messages.length + 1, username: this.state.messages[0].username, content: event.target.value};
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages})

}

  render() {

    return (
      <html>
      <body>
      <div>
        <nav>
          <h1>Stupid Chat App</h1>
        </nav>
          <MessageList messages={this.state.messages} />
          <Message />
          <ChatBar people={this.state.messages[0].username} postMessage={this.post} />
      </div>
    </body>
    </html>
    );
    }
  }

export default App;
