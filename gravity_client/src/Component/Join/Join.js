import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./join.css";

export default function Join() {
    const [name, setname] = useState('')
    const [room, setroom] = useState('');

    return (
        <div className="wrapper">
            <form className="joinform">
                <h2>Join Gravity Chat</h2>
                <input type="text" placeholder="Name" className="jointInput" onChange={(e) => setname(e.target.value)} />
                <input type="text" placeholder="Room" className="jointInput" onChange={(e) => setroom(e.target.value)} />
                <Link to={`/chat?name=${name}&room=${room}`} onClick={(e) => (!name || !room) ? e.preventDefault() : null} >
                    <button type="submit" className="join_button">
                        Sign In
                    </button>
                </Link>
            </form>
        </div>
    )
}