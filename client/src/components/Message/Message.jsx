import React, { PureComponent } from 'react';
import Remarkable from 'remarkable';
import { connect } from 'react-redux';

import { deleteMessage } from 'actions/message';
import "./Message.scss";

class Message extends PureComponent {

    getRawMarkup(text) {
        const md = new Remarkable();
        const markdown = md.render(text);
        return { __html: markdown }
    }

    handleClick = (e) => {
        e.stopPropagation();
        const { message, deleteMessage } = this.props;
        deleteMessage(message._id);
    };

    handleToggle = () => {
        this.props.handleToggle(this.props.message._id);
    };

    render() {
        const { message, userId } = this.props;
        const check = this.props.messages.some(m => m === message._id);
        return (
            <div className={ message.author === userId ? "message--client" : "message" }
                style={{ border: check ? '1px solid lightblue' : 'none' }} onClick={ this.handleToggle }>
                <span
                   className="message__delete-btn"
                   onClick={ this.handleClick }
                >
                    x
                </span>
                <div dangerouslySetInnerHTML={this.getRawMarkup(message.text)} />
                <span className="message__time">{new Date(message.createdAt).toLocaleString()}</span>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    ...props,
    deleteMessage: (id) => dispatch(deleteMessage(id))
});

export default connect(null, mapDispatchToProps)(Message);