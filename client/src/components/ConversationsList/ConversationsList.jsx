import React from 'react';
import "./ConversationsList.scss"


const ConversationsList = ({
	conversations,
	onClick,
}) => (
	<ul className="conversations-list">
		{conversations.map(conversation => (
			<li
				className="conversation"
				key={conversation._id}
				onClick={() => onClick(conversation._id)}
			>
				<img src={conversation.image || "https://otvet.imgsmail.ru/download/1448bb4efce8f11e7e5dd8578869146b_i-57.jpg"}
					 className="conversation__image"/>
				<span className="conversation__title">{conversation.title}</span>
			</li>
		))}
	</ul>
);

export default ConversationsList;
