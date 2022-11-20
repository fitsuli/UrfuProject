import React, {useEffect, useState} from 'react';
import '../../App.css';
import {Button, Card, TextField} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import "../../Styles/Auth.css"
import {BackgroundTintStyle} from "../../Styles/SxStyles";
import {useAuth} from "./AuthProvider";

const SignIn = () => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation();
    // @ts-ignore
    const from = location.state?.from?.pathname?.startsWith("/invite") ? location.state?.from : "/home";

    useEffect(() => {
        if (auth.isAuthorized) {
            navigate("/home", {replace: true})
        }
    })

    const onSignIn = () => {
        auth.signIn(login, password)
            .then(async resp => {
                if (!resp.ok) {
                    let errorMessage = await resp.text()
                    setErrorMessage(errorMessage)
                } else {
                    navigate(from)
                }
            })
    }

    return <div className="auth-container">
        <Card variant="outlined" className="auth-card" sx={BackgroundTintStyle}>
            <div className="auth">
                <TextField label="Логин"
                           autoFocus={true}
                           onChange={x => setLogin(x.target.value)}
                           id={"login"}/>
                <TextField label="Пароль"
                           type="password"
                           onChange={x => setPassword(x.target.value)}
                           id={"password"}/>
                <Button onClick={() => onSignIn()}
                        variant="contained"
                        disabled={!login || !password}>Войти</Button>
                <Button variant="outlined"
                        onClick={() => navigate("/signUp", {state: from})}
                        type="submit">Регистрация</Button>
                <div className="error">{errorMessage}</div>
            </div>
        </Card>
    </div>
}

export default SignIn;