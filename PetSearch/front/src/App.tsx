import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./Components/Auth/AuthProvider";
import { Navigate, useRoutes } from "react-router-dom";
import SignIn from "./Components/Auth/SignIn";
import { SignUp } from "./Components/Auth/SignUp";
import { RequireAuth } from "./Components/Auth/RequiredAuth";
import ThemeProvider from "./Theme/ThemeProvider";
import BaseLayout from "./Components/Layouts/BaseLayout";
import { LostAnimalsPage } from "./Components/Pages/LostAnimalsPage";
import { FoundAnimalsPage } from "./Components/Pages/FoundAnimalsPage";
import { AnimalsMap } from "./Components/Pages/AnimalsMap";
import { SnackbarProvider } from "notistack";
import { Grow } from "@mui/material";
import { LocalizationProvider, } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";
import { AnimalInnerPage } from "./Components/Animals/AnimalInnerPage";
import { ErrorPage } from "./Components/Pages/ErrorPage";
import { CreateAnimalPostPage } from "./Components/Pages/CreateAnimalPostPage";

axios.defaults.baseURL = 'https://localhost:7257/api'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

function App() {
  const routes = useRoutes([
    { path: "signIn", element: <SignIn /> },
    { path: "signUp", element: <SignUp /> },
    {
      path: "/", element: <RequireAuth><BaseLayout /></RequireAuth>,
      children: [
        { element: <Navigate to="/lost" />, index: true },
        { path: "lost", element: <LostAnimalsPage /> },
        { path: "lost/:lostAnimalId", element: <AnimalInnerPage /> },
        { path: "found", element: <FoundAnimalsPage /> },
        { path: "found/:lostAnimalId", element: <AnimalInnerPage /> },
        { path: "map", element: <AnimalsMap /> },
        { path: "addPost", element: <CreateAnimalPostPage /> }
      ]
    },
    { path: "*", element: <ErrorPage /> }])

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <SnackbarProvider anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }} TransitionComponent={Grow}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {routes}
            </LocalizationProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
