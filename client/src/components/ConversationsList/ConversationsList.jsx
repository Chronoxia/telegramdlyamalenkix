import React from 'react';
import "./ConversationsList.css"


const ConversationsList = ({
	conversations,
	onClick,
}) => (
	<ul className="users-list">
		{conversations.map(conversation => (
			<li 
				className="users-item"
				key={conversation.id}
				onClick={() => onClick(conversation.id)}
			>
				{conversation.title}
			</li>
		))}
	</ul>
);

export default ConversationsList;
