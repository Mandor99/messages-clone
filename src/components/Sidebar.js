import { Avatar, IconButton } from '@material-ui/core';
import { RateReviewOutlined, Search } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import UserChat from './UserChat';
import '../styles/Sidebar.css';
import { selectUser } from '../features/user/userSlice';
import { useSelector } from 'react-redux';
import { auth, db } from './firebase/Firebase';

function Sidebar() {
	const [chats, setChats] = useState([]);

	useEffect(() => {
		db.collection('chats').onSnapshot((snap) => {
			const users = snap.docs.map((doc) => ({
				data: doc.data(),
				id: doc.id,
			}));
			setChats(users);
			// setChats(
			// 	snap.docs.map((doc) => ({
			// 		data:doc.data(),
			// 		id: doc.id
			// 	}))
			// )
		});
		// return queryDocs
	}, []);

	const user = useSelector(selectUser);

	const signOut = () => {
		auth.signOut();
	};

	const addChat = () => {
		const chatName = prompt('enter chat name!');
		if (chatName) {
			db.collection('chats').add({
				chatName: chatName,
			});
		}
	};

	return (
		<aside className='sidebar'>
			<nav className='sidebar__navbar'>
				<Avatar
					src={user.photoURL}
					style={{ cursor: 'pointer' }}
					onClick={signOut}
				/>
				<div className='sidebar__wrapper--input'>
					<Search opacity='.7' />
					<input type='text' name='search' placeholder='search' />
				</div>
				<IconButton
					variant='outlined'
					className='sidebar__newUser'
					color='inherit'
					onClick={addChat}
				>
					<RateReviewOutlined opacity='.7' /*onClick={addChat}*/ />
				</IconButton>
			</nav>
			<section className='sidebar__chats'>
				{chats.map(({ id, data: { chatName } }) => (
					<UserChat key={id} id={id} chatName={chatName} />
				))}
			</section>
		</aside>
	);
}

export default Sidebar;
