import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  render() {
    return (
      <html>
      <body>
      <div class="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <div id="message-list">
          <MessageList />
          <Message />
        </div>
          <ChatBar />
      </div>
    </body>
    </html>
    );
  }
}
export default App;
