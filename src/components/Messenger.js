import React from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat'
import '../styles/Messenger.css'

function Messenger() {
    return (
        <div className="messenger">
            <Sidebar />
            <Chat />
        </div>
    )
}

export default Messenger
