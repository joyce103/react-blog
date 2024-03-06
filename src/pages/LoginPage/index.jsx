import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MEDIA_QUERY_MOBILE } from "../../constants/breakpoint";
import { login } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

const ErrorMessage = styled.p`
  color: red;
`;
const LoginForm = styled.form`
  width: 500px;
  margin: 50px auto;
  padding: 50px 0;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${MEDIA_QUERY_MOBILE} {
    width: 90%;
  }
`;
const LoginTitle = styled.h1`
  font-size: 2.5rem;
`;
const LoginButton = styled.button`
  background: transparent;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 5px 15px;
  margin-top: 15px;
  font-size: 1rem;
  ${MEDIA_QUERY_MOBILE} {
    margin-top: 40px;
  }
`;
const LoginInput = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${MEDIA_QUERY_MOBILE} {
    flex-direction: column;
    align-items: flex-start;
  }
  p {
    font-size: 1.2rem;
    margin: 10px 10px 10px 0;
  }
  input {
    width: 200px;
    ${MEDIA_QUERY_MOBILE} {
      width: 100%;
    }
  }
`;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.user.isLogin);
  const errorMessage = useSelector((store) => store.user.errorMessage);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, dispatch]);

  return (
    <LoginForm onSubmit={handleSubmit}>
      <LoginTitle>LOGIN</LoginTitle>
      <LoginInput>
        <p>username</p>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </LoginInput>
      <LoginInput>
        <p>password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </LoginInput>
      <LoginButton>login</LoginButton>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </LoginForm>
  );
}
