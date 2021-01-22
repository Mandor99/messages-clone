import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import '../styles/UserChat.css';
import { userChat } from '../features/user/chatSlice';
import { useDispatch } from 'react-redux';
import { db } from './firebase/Firebase';
import * as timeago from 'timeago.js';

function UserChat({ id, chatName }) {
	const [miniChat, setMiniChat] = useState([]);

	useEffect(() => {
		db.collection('chats')
			.doc(id)
			.collection('messages')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snap) => {
				setMiniChat(snap.docs.map((doc) => doc.data()));
			});
	}, [id]);

	const dispatch = useDispatch();

	const setUser = (e) => {
		dispatch(
			userChat({
				chatId: id,
				chatName: chatName,
			}),
		);
		// console.log(e.target.style);
		// e.target.style.width = '0';
		// e.target.style.visibility = 'hidden';
	};
	// miniChat[{msg1}, {msg2}, ...] so miniChat[0] ==> first user who send msgs

	return (
		<div className='mini-chat' onClick={setUser}>
			<Avatar src={miniChat[0]?.photo} />
			<div className='mini-chat__summary'>
				<h3 className='mini-chat__user-name'>{chatName}</h3>
				<p className='mini-chat__lastMsg'>{miniChat[0]?.msg}</p>
				<small className='mini-chat__timestamp'>
					{timeago.format(new Date(miniChat[0]?.timestamp?.toDate()))}
				</small>
			</div>
		</div>
	);
}

export default UserChat;
