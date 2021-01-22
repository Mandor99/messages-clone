import { Avatar } from '@material-ui/core';
import React, {forwardRef} from 'react';
import '../styles/Message.css';
import {selectUser} from '../features/user/userSlice'
import {useSelector} from 'react-redux';
import * as timeago from 'timeago.js';

const Message = forwardRef(({id, data: {msg, photo, timestamp, email}}, ref) => {

	const user = useSelector(selectUser)

	return (
		<div ref={ref} className={`msg ${email === user.email && 'msg--sender'}`}>
			<Avatar  src={photo} className='msg__pic'/>
			<p className='msg__content'>{msg}</p>
			<small className='msg__time'>{timeago.format(new Date(timestamp?.toDate()))}</small>
		</div>
	);
})

export default Message;
