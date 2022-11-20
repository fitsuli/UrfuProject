import {useAuth} from "./Auth/AuthProvider";

export const Home = () =>{
    const auth = useAuth()

    return(
       <div>Hello, pidrila {auth.user ? auth.user.fullName : null}</div>
    )
}