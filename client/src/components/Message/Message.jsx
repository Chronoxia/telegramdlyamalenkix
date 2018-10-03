import React, { PureComponent } from 'react';
import Remarkable from 'remarkable';
import { connect } from 'react-redux';

import { deleteMessage } from 'actions/messageActions';
import "./Message.css";

class Message extends PureComponent {

    getRawMarkup(text) {
        const md = new Remarkable();
        const markdown = md.render(text);
        return { __html: markdown }
    }

    handleClick = () => {
        const { id, deleteMessage } = this.props;
        deleteMessage(id);
    };

    handleToggle = () => {
        this.props.handleToggle(this.props.id);
    };

    render() {
        const { text, author, userId, id } = this.props;
        const check = this.props.messages.some(m => m === id)
        return (
            <div className={ author === userId ? "client-message" : "message" } 
                style={{ border: check ? '1px solid lightblue' : 'none' }} onClick={ this.handleToggle }>
                <span
                    style={{ cursor: 'pointer' }}
                    onClick={ this.handleClick }
                >
                    x
                </span>
                 <div dangerouslySetInnerHTML={this.getRawMarkup(text)} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    ...props,
    deleteMessage: (id) => dispatch(deleteMessage(id))
});

export default connect(null, mapDispatchToProps)(Message);