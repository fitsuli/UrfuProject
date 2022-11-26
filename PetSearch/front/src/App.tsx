import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./Components/Auth/AuthProvider";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import SignIn from "./Components/Auth/SignIn";
import { SignUp } from "./Components/Auth/SignUp";
import { RequireAuth } from "./Components/Auth/RequiredAuth";
import ThemeProvider from "./Theme/Theme";
import BaseLayout from "./Components/Templates/BaseLayout";
import { ReactNode } from "react";
import { LostAnimalsPage } from "./Components/Pages/LostAnimalsPage";
import { FoundAnimalsPage } from "./Components/Pages/FoundAnimalsPage";
import { AnimalsShelterPage } from "./Components/Pages/AnimalsShelterPage";

axios.defaults.baseURL = 'https://localhost:5001/api'

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
        { element: <Navigate to="/Lost" />, index: true },
        { path: "Lost", element: <LostAnimalsPage /> },
        { path: "Found", element: <FoundAnimalsPage /> },
        { path: "Shelter", element: <AnimalsShelterPage /> }
      ]
    }])

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          {routes}
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

//TODO: сделать боковой навигатор зелёного цвета (при нажатии)

export default App;
