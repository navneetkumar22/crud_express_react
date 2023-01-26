import React, { useState } from 'react';
import axios from "axios";

export const Form = () => {
    // to store form data - useStates
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    //function to send the data
    const submitData = async () => {
        const data = { name: userName, email: userEmail }
        
        await axios.post("/create", data)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        submitData();

        //empty the form input every time it submits
        setUserName("");
        setUserEmail("");
    }

    return (
        <div>
            <div class="container">
                <h1>CRUD App - React + Express</h1>
                <section className="form-input">
                    <form onSubmit={handleSubmit}>
                        <input type="text" id="name" name='name' placeholder="Enter your name" value={userName} onChange={(event) => {setUserName(event.target.value);}}/>
                        <input type="email" id="email" name='email' placeholder="Enter your email" value={userEmail} onChange={(event) => {setUserEmail(event.target.value);}} />
                        <button id="btn" type='submit'>Create User</button>
                    </form>
                </section>
            </div>
        </div>
    )
}

