import React, { useEffect, useState, useContext } from "react";
import { getCurrentPost } from "../../WebAPI";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DeletePost } from "../../WebAPI";
import { AuthContext } from "../../contexts";

const PostContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 50px 0;
`;
const PostHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const PostTitle = styled.h1`
  color: #000;
`;
const PostTime = styled.p`
  color: #555;
`;
const PostBody = styled.p`
  color: #000;
  text-align: justify;
`;
const DeleteBtn = styled.button`
  background: transparent;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 5px;
  &:hover {
    cursor: pointer;
    background: #ddd;
  }
`;
const Loading = styled.div`
  width: 100%;
  height: 100vh;
  background: #ddd;
  opacity: 0.5;
  font-size: 2rem;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const Post = ({ post, onDelete, isLogin }) => {
  const { title, body, createdAt } = post;
  return (
    <PostContainer>
      <PostHeader>
        <PostTitle>{title}</PostTitle>
        <PostTime>{new Date(createdAt).toLocaleString()}</PostTime>
      </PostHeader>
      <PostBody>{body}</PostBody>
      {isLogin && <DeleteBtn onClick={onDelete}>刪除文章</DeleteBtn>}
    </PostContainer>
  );
};

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePostDelete = () => {
    DeletePost(postId).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    user ? setIsLogin(true) : setIsLogin(false);
  }, [user]);

  useEffect(() => {
    setIsLoading(true);
    getCurrentPost(postId)
      .then((res) => {
        setPosts(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(true);
      });
  }, [postId]);

  return (
    <>
      <Post post={posts} onDelete={handlePostDelete} isLogin={isLogin} />
      {isLoading && <Loading>載入中</Loading>}
    </>
  );
}
