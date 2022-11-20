import React from 'react';
import axios from "axios";
import {QueryClient, QueryClientProvider} from "react-query";
import {AuthProvider} from "./Components/Auth/AuthProvider";
import {Route, Routes} from "react-router-dom";
import SignIn from "./Components/Auth/SignIn";
import {SignUp} from "./Components/Auth/SignUp";
import {Home} from "./Components/Home";
import {RequireAuth} from "./Components/Auth/RequiredAuth";

axios.defaults.baseURL = 'https://localhost:5001/api'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path={"signIn"} element={<SignIn/>}/>
            <Route path={"signUp"} element={<SignUp/>}/>
            <Route path={"/*"} element={<RequireAuth><Home/></RequireAuth>}/>
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
  );
}

export default App;
