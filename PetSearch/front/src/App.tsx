import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./Components/Auth/AuthProvider";
import { Navigate, useRoutes } from "react-router-dom";
import SignIn from "./Components/Auth/SignIn";
import { SignUp } from "./Components/Auth/SignUp";
import { RequireAuth } from "./Components/Auth/RequiredAuth";
import ThemeProvider from "./Theme/ThemeProvider";
import BaseLayout from "./Components/Templates/BaseLayout";
import { LostAnimalsPage } from "./Components/Pages/LostAnimalsPage";
import { FoundAnimalsPage } from "./Components/Pages/FoundAnimalsPage";
import { AnimalsShelterPage } from "./Components/Pages/AnimalsShelterPage";
import { SnackbarProvider } from "notistack";
import { Grow } from "@mui/material";
import {LocalizationProvider,} from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

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
        { path: "found", element: <FoundAnimalsPage /> },
        { path: "shelter", element: <AnimalsShelterPage /> }
      ]
    }])

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <SnackbarProvider anchorOrigin={{
            vertical: 'top',
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

//TODO: сделать боковой навигатор зелёного цвета (при нажатии)

export default App;
