import React, {useState} from 'react';
import firebase from "./firebase/firebase";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (error) {
            console.error("Error in sign up: ", error.message);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default SignUp;