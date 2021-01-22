import { IconButton } from '@material-ui/core';
import { MicNone, NearMe } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import Message from './Message';
import { selectChatName, selectChatId } from '../features/user/chatSlice';
import { selectUser } from '../features/user/userSlice';
import '../styles/Chat.css';
import { useSelector } from 'react-redux';
import { db } from './firebase/Firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

function Chat() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);
	const chatUserName = useSelector(selectChatName);
	const chatId = useSelector(selectChatId);
	const user = useSelector(selectUser);
	useEffect(() => {
		if (chatId) {
			db.collection('chats')
				.doc(chatId)
				.collection('messages')
				.orderBy('timestamp', 'desc')
				.onSnapshot((snap) => {
					setMessages(
						snap.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						})),
					);
				});
		}
	}, [chatId]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		//firebase code.........
		await db.collection('chats').doc(chatId).collection('messages').add({
			msg: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			uid: user.uid,
			email: user.email,
			photo: user.photoURL,
			displayName: user.displayName,
		});

		setInput('');
	};
	return (
		<main className='chat'>
			<header className='chat__header'>
				<h4 className='chat__username'>
					To: <span className='chat__username--name'>{chatUserName}</span>
				</h4>
				<p className='chat__user--info'>details</p>
			</header>

			<article className='chat__massages'>
				<FlipMove>
					{messages.map(({ id, data }) => (
						<Message key={id} data={data} />
					))}
				</FlipMove>
			</article>

			<div className='chat__wrapper-form'>
				<form className='chat__form' onSubmit={handleSubmit}>
					<input
						type='text'
						name='massage'
						className='chat__input--massage'
						placeholder='massage'
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
				</form>

				<IconButton variant='Two Tone' color='inherit' onClick={handleSubmit}>
					<NearMe />
				</IconButton>
			</div>
		</main>
	);
}

export default Chat;
