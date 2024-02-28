import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import style from "./AuthForms.module.css"

const SignIn = ({ setIsAuth }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setIsAuth(true);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="sign-in">
            <form onSubmit={signIn}>
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
                <button className={style.button} type="submit">Login</button>
            </form>
        </div>
    )
}

export default SignIn;