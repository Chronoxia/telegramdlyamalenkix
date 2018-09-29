import React, { PureComponent } from 'react';
import "./Message.css"

export default class Message extends PureComponent {

    render() {
        const { text, author, userId } = this.props;
        console.log(author, userId );
        return (
            <div className={ author===userId ? "client-message" : "message" }>
                {text}
            </div>
        );
    }
}
