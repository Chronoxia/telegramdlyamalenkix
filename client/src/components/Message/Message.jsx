import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import ReactDOMServer from 'react-dom/server';
import { Emoji as EmojiMartEmoji } from 'emoji-mart';
import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji';

import { deleteMessage } from 'actions/message';
import "./Message.scss";

class Message extends PureComponent {

    getRawMarkup(text) {
        const md = MarkdownIt({
            html: true,
            linkify: true,
            typographer: true,
            breaks: false,
        }).use(emoji);

        md.renderer.rules.emoji = (tokens, idx) =>
            ReactDOMServer.renderToStaticMarkup(<EmojiMartEmoji emoji={tokens[idx].markup} size={25} />);

        const rawMarkup = md.render(text);
        return {__html : rawMarkup};
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