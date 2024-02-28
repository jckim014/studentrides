import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import style from "./AuthForms.module.css"

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = (e) => {
        e.preventDefault();
        if(password.length < 6) {
            alert("Password must be at least 6 characters long");
            return; // Stop further execution
        }
        else {
            alert("Success!");
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="sign-in">
            <form onSubmit={signUp}>
                <input 
                    className={style.textBox}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                <input 
                    className={style.textBox}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <button className={style.button} type="submit">Create Account</button>
            </form>
        </div>
    )
}

export default SignUp;