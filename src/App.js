import React, { useEffect } from 'react';
import Messenger from './components/Messenger';
import LogIn from './components/LogIn';
import { selectUser, logIn, logOut } from './features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './components/firebase/Firebase';
import './App.css';

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	useEffect(() => {
		auth.onAuthStateChanged((newUser) => {
			newUser
				? dispatch(
						logIn({
							uid: newUser.uid,
							email: newUser.email,
							photoURL: newUser.photoURL,
							displayName: newUser.displayName,
						}),
				  )
				: dispatch(logOut());
		});
	}, [dispatch]);

	return <div className='App'>{user ? <Messenger /> : <LogIn />}</div>;
}

export default App;
