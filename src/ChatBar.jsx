import React, {Component} from 'react';


class ChatBar extends Component {

  sendMessage = (t) => {
    if(t.key === 'Enter') {
    this.props.postMessage(t)
    this.refs.remove.value = '';
    }
  }


  render() {
    return (
      <footer>
        <input id="username" type="text" placeholder="Your Name (Optional)"
               defaultValue= {this.props.people}/>
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER"
               onKeyPress={this.sendMessage} ref="remove" />
      </footer>
    );
  };
}

export default ChatBar;