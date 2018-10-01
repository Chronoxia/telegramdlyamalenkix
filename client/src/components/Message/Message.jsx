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
        console.log(this.props);
        deleteMessage(id);
    }

    render() {
        const { text, author, userId } = this.props;
        return (
            <div className={ author === userId ? "client-message" : "message" }>
                <span
                    style={{ cursor: 'pointer' }}
                    onClick={this.handleClick}
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
})

export default connect(null, mapDispatchToProps)(Message);