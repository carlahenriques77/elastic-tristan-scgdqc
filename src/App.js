import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthentication } from "./hooks/useAuthentication";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import CreatePost from "./pages/CreatePost/CreatePost";
import EditPost from "./pages/EditPost/EditPost";
import Post from "./pages/Post/Post";
import Search from "./pages/Search/Search";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const { authHandler } = useAuthentication();

  const loadingUser = currentUser === undefined;

  useEffect(() => {
    onAuthStateChanged(authHandler, (authUser) => {
      setCurrentUser(authUser);
    });
  }, [authHandler]);

  if (loadingUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ currentUser }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/Posts/:id" element={<Post />} />

              <Route
                path="/Dashboard"
                element={
                  currentUser ? <Dashboard /> : <Navigate to="/Login" />
                }
              />
              <Route
                path="/Posts/Create"
                element={
                  currentUser ? <CreatePost /> : <Navigate to="/Login" />
                }
              />
              <Route
                path="/Posts/Edit/:id"
                element={
                  currentUser ? <EditPost /> : <Navigate to="/Login" />
                }
              />
              <Route
                path="/Register"
                element={!currentUser ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/Login"
                element={!currentUser ? <Login /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
