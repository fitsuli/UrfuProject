import React, {useEffect, useState} from 'react';
import '../../App.css';
import {Button, Card, FormControlLabel, Radio, RadioGroup, TextField, ThemeProvider, useTheme} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "./AuthProvider";
import {SignUpModel} from "../../Models/SignUpModel";
import {BackgroundTintStyle} from "../../Styles/SxStyles";


export const SignUp = () => {
    const [model, setModel] = useState<SignUpModel>(
        {
            fullName: "",
            role: "Admin",
            login: "",
            password: "",
        }
    )

    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const auth = useAuth()
    const theme = useTheme()

    useEffect(() => {
        if (auth.isAuthorized) {
            navigate("/lost", {replace: true})
        }
    })


    const location = useLocation();
    // @ts-ignore
    const from = location.state?.from || "/lost";

    const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setModel({...model, [prop]: event.target.value});
    };

    const onSignUp = (model: SignUpModel) => {
        auth.signUp(model)
            .then(async resp => {
                if (!resp.ok) {
                    let errorMessage = await resp.text()
                    setErrorMessage(errorMessage)
                } else {
                    navigate("/lost")
                }
            })
    }

    return <div className="auth-container">
            <Card variant={"outlined"} className="auth-card" sx={BackgroundTintStyle}>
                <div className="auth">
                    <TextField label="ФИО" onChange={handleChange("fullName")} id={"fullName"}/>
                    <TextField label="Логин" onChange={handleChange("login")} id={"login"}/>
                    <TextField label="Пароль" onChange={handleChange("password")} type="password" id={"password"}/>
                    <RadioGroup
                        className="radio"
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={model.role}
                        onChange={handleChange("role")}
                    >
                        <FormControlLabel value="Admin" control={<Radio/>} label="Admin"/>
                        <FormControlLabel value="User" control={<Radio/>} label="User"/>
                    </RadioGroup>
                    <Button onClick={() => onSignUp(model)}
                            variant="contained"
                            disabled={!(model.password && model.login && model.fullName)}>Зарегистрироваться</Button>
                    <Button variant="outlined"
                            onClick={() => navigate("/signIn", {state: from})}
                            type="submit">Войти</Button>
                </div>
                <div className="error">{errorMessage}</div>
            </Card>
    </div>
}