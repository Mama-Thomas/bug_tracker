import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import BugsList from "./components/Bugs/BugsList";
import ProjectBugsList from "./components/Bugs/ProjectBugsList";
import BugDetails from "./components/Bugs/BugDetails";
import BugForm from "./components/Bugs/BugForm";
import ProjectList from "./components/Projects/ProjectList";
import ProjectDetails from "./components/Projects/ProjectDetails";
import ProjectForm from "./components/Projects/ProjectForm";
import UserList from "./components/Users/UserList";
import UserDetails from "./components/Users/UserDetails";
import UserForm from "./components/Users/UserForm";
import Unauthorized from "./components/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import authService from "./services/authService";
import "./App.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Routes>
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route path="/bugs" element={<PrivateRoute component={BugsList} />} />
          <Route
             path="/bugs/:id"
             element={<PrivateRoute component={BugDetails} />}
           />
          <Route
            path="/projects/:projectId/bugs/new"
            element={<PrivateRoute component={BugForm} />}
          />
          <Route
            path="/projects/:projectId/bugs/:id/edit"
            element={<PrivateRoute component={BugForm} />}
          />
          <Route
            path="/projects/:projectId/bugs"
            element={<PrivateRoute component={ProjectBugsList} />}
          />
          <Route
            path="/projects"
            element={<PrivateRoute component={ProjectList} />}
          />
          <Route
            path="/projects/new"
            element={<PrivateRoute component={ProjectForm} roles={[1, 2]} />}
          />
          <Route
            path="/projects/:id"
            element={<PrivateRoute component={ProjectDetails} />}
          />
          <Route
            path="/projects/edit/:id"
            element={<PrivateRoute component={ProjectForm} roles={[1, 2]} />}
          />
          <Route
            path="/users"
            element={<PrivateRoute component={UserList} roles={[1]} />}
          />
          <Route
            path="/users/new"
            element={<PrivateRoute component={UserForm} roles={[1]} />}
          />
          <Route
            path="/users/:id"
            element={<PrivateRoute component={UserDetails} roles={[1]} />}
          />
          <Route
            path="/users/edit/:id"
            element={<PrivateRoute component={UserForm} roles={[1]} />}
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

