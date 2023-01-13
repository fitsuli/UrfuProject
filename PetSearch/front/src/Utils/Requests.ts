import settings from "../settings.json";
import {SignUpModel} from "../Models/SignUpModel";
import { CreateAnimalDto } from "../Models/CreateAnimalDto";
import axios from "axios";

export const signInRequest = (login: string, password: string) => {
    return fetch(settings.serverEndpoint + "/auth/signIn", {
        method: "POST",
        headers: {
            'login': login,
            'password': password
        },
    });
}

export const signUpRequest = (signUpDto: SignUpModel) => {
    return fetch(settings.serverEndpoint + "/auth/signUp", {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(signUpDto)
    })
}

export const signedInUserRequest = () => {
    return fetch(settings.serverEndpoint + "/users/me", {
        method: 'GET'
    })
}