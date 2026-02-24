import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import MyTasks from "./pages/MyTasks.tsx";
import Settings from "./pages/Settings.tsx";
import App from "./App.tsx";
import Team from "./pages/Team.tsx";
import Login from "./pages/Login.tsx";
import Registration from "./pages/Registration.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/staff/login" element={<Login />} />
      <Route path="/staff/registration" element={<Registration />} />
      <Route
        path="/staff"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="/staff/my-tasks" element={<MyTasks />} />
        <Route path="/staff/settings" element={<Settings />} />
        <Route path="/staff/team" element={<Team />} />
      </Route>
    </>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
