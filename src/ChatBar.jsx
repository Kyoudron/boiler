import React, {Component} from 'react';


class ChatBar extends Component {

  sendMessage = (t) => {
    if(t.key === 'Enter') {
      this.props.postMessage(t)
      this.refs.remove.value = '';
    }
  }

  changeUser = (e) => {
    if(e.key === 'Enter') {
      this.props.diffUser(e);
    }
  }

  render() {
    return (
      <footer>
        <input id="username" type="text" placeholder="Your Name (Optional)"
               onKeyPress={this.changeUser} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER"
               onKeyPress={this.sendMessage} ref="remove" />
      </footer>
    );
  };
}

export default ChatBar;