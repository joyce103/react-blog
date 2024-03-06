import React, {useState, useEffect} from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PostsPage from "./pages/PostsPage";
import Header from "./components/Header";
import NewPostPage from "./pages/NewPostPage";
import styled from "styled-components";
import { AuthContext } from "./contexts";
import { getMe } from "./WebAPI";

const Root = styled.div``;

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getMe().then(res => {
      if(res.ok) {
        setUser(res.data)
      }
    })
  },[])
  return (
    <AuthContext.Provider value={{user, setUser}}>
      <Root>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/new-post" element={<NewPostPage />} />
            <Route path="/posts/:postId" element={<PostsPage />} />
          </Routes>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
