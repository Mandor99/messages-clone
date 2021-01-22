import firebase from 'firebase';
// import 'firebase/firestore';
// import 'firebase/auth';

//init firebase
const firebaseConfig = {
	apiKey: 'AIzaSyCfO3R8JfvKiS2dWjNmC-9cE0FUB0dJv2Q',
	authDomain: 'messenger-clone-40394.firebaseapp.com',
	projectId: 'messenger-clone-40394',
	storageBucket: 'messenger-clone-40394.appspot.com',
	messagingSenderId: '941332070899',
	appId: '1:941332070899:web:0549987f5fab8298db9286',
	measurementId: 'G-4L7D65MKPG',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
