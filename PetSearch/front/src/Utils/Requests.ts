import settings from "../settings.json";
import {RegistrationModel} from "../Models/RegistrationModel";

export const loginRequest = (login: string, password: string) => {
    return fetch(settings.serverEndpoint + "/auth/signIn", {
        method: "POST",
        headers: {
            'login': login,
            'password': password
        },
    });
}

export const registrationRequest = (registrationDto: RegistrationModel) => {
    return fetch(settings.serverEndpoint + "/auth/signUp", {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(registrationDto)
    })
}

export const signedInUserRequest = () => {
    return fetch(settings.serverEndpoint + "/users/me", {
        method: 'GET'
    })
}