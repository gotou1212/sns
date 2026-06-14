import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import LoginPage  from "./pages/Loginpage";
import SignupPage  from "./pages/SignupPage";
import { AuthProvider } from "./contexts/AuthContext";
import { PostModalProvider } from "./contexts/PostModalContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PostModalProvider>
        <RouterProvider router={router} />
      </PostModalProvider>
    </AuthProvider>
  </StrictMode>,
)
