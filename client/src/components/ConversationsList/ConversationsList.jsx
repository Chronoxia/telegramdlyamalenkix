import React from 'react';
import "./ConversationsList.scss"


const ConversationsList = ({
	conversations,
	onClick,
	activeConversation,
}) => (
	<ul className="conversations-list">
		{conversations.map(conversation => {
			let a;
			if (!conversation.author && conversation.online) a = 'online';
			if (!conversation.author && !conversation.online) a = 'offline';
			return (
				<li
					className={activeConversation === conversation._id ? 'conversation conversation--active' : 'conversation'}
					key={conversation._id}
					onClick={() => onClick(conversation._id)}
				>
					<img src={conversation.image || "http://www.drawingforall.net/wp-content/uploads/2018/01/chidi-drawing-lesson.jpg"}
						 className={`conversation__image conversation__image--${a}`} />
					<span className="conversation__title">{conversation.title}</span>
					{conversation.newMessages && <span>NEW MESSAGE ALO BLYAT</span>}
				</li>
			)
		})}
	</ul>
);

export default ConversationsList;
