import {Button} from '@material-ui/core'
import React from 'react'
import {auth, provider} from './firebase/Firebase'
import '../styles/LogIn.css'

function LogIn() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(err => alert(err.message))
    }
    return (
        <section className="login-page">
            <figure>
                <img className="login__logo" src="./logo1.png" alt="logo app"/>
            </figure>
            <Button onClick={signIn} style={{color:'#fff', backgroundColor: '#36a2ce', width: '15rem', fontWeight: '700'}}>sign in</Button>
        </section>
    )
}

export default LogIn
