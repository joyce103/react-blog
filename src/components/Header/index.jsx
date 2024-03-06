import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MEDIA_QUERY_MOBILE } from "../../constants/breakpoint";
import { logout } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #c8c8c8;
  ${MEDIA_QUERY_MOBILE} {
    flex-direction: column;
  }
`;

const Brand = styled.h1`
  padding: 10px 20px;
  margin: 0;
  font-size: 2.5rem;
  ${MEDIA_QUERY_MOBILE} {
    margin-bottom: 30px;
  }
`;

const NavbarList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${MEDIA_QUERY_MOBILE} {
    margin-bottom: 30px;
  }
`;

const Nav = styled(Link)`
  padding: 0 15px;
  color: #000000;
  text-decoration: none;
  font-size: 1.2rem;
  transition: 0.5s;
  ${(props) =>
    props.$active &&
    `
      background: #c8c8c8;
    `}
`;

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.user.isLogin);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin, dispatch]);

  return (
    <HeaderContainer>
      <Brand>部落格</Brand>
      <NavbarList>
        <Nav to="/" $active={location.pathname === "/"}>
          首頁
        </Nav>
        {isLogin && (
          <Nav to="/new-post" $active={location.pathname === "/new-post"}>
            發布文章
          </Nav>
        )}
        {!isLogin ? (
          <Nav to="/login" $active={location.pathname === "/login"}>
            登入
          </Nav>
        ) : (
          <Nav onClick={handleLogout}>登出</Nav>
        )}
      </NavbarList>
    </HeaderContainer>
  );
}
