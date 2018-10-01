import React, { PureComponent } from 'react';
import Remarkable from 'remarkable'
import "./Message.css"

class Message extends PureComponent {

    getRawMarkup(text) {
        const md = new Remarkable();
        const markdown = md.render(text);
        console.log(markdown);
        return { __html: markdown }
    }

    render() {
        const { text, author, userId } = this.props;
        return (
            <div className={ author === userId ? "client-message" : "message" }
                 dangerouslySetInnerHTML={this.getRawMarkup(text)}>
            </div>
        )
    }
}

export default Message;