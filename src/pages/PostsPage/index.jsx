import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deletePost } from "../../WebAPI";
import { getCurrentPost } from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";

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

const Post = ({ currentPost, postDelete, isLogin }) => {
  const { title, body, createdAt } = currentPost;
  return (
    <PostContainer>
      <PostHeader>
        <PostTitle>{title}</PostTitle>
        <PostTime>{new Date(createdAt).toLocaleString()}</PostTime>
      </PostHeader>
      <PostBody>{body}</PostBody>
      {isLogin && <DeleteBtn onClick={postDelete}>刪除文章</DeleteBtn>}
    </PostContainer>
  );
};

export default function PostsPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.posts.isLoadingPost);
  const currentPost = useSelector((store) => store.posts.currentPost);
  const isLogin = useSelector((store) => store.user.isLogin);

  const handlePostDelete = () => {
    deletePost(postId).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    dispatch(getCurrentPost(postId));
  }, [postId, dispatch]);

  return (
    <>
      {currentPost && (
        <Post currentPost={currentPost} postDelete={handlePostDelete} isLogin={isLogin} />
      )}
      {isLoading && <Loading>載入中</Loading>}
    </>
  );
}
