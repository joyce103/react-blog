import React, { useEffect, useState, useContext } from "react";
import { getPosts } from "../../WebAPI";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DeletePost } from "../../WebAPI";
import { AuthContext } from "../../contexts";

const PostContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 50px 0;
`;
const PostTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  p {
    color: #555;
  }
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

const Post = ({ post }) => {
  const { title, body, createdAt } = post;
  return (
    <>
      <PostTitle>
        <h1>{title}</h1>
        <p>{new Date(createdAt).toLocaleString()}</p>
      </PostTitle>
      <p>{body}</p>
    </>
  );
};

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePostDelete = () => {
    DeletePost(postId);
    alert("刪除成功!");
    navigate("/");
  };

  useEffect(() => {
    getPosts().then((post) => {
      post && setPosts(post);
    });
  }, []);

  const currentPost =
    posts && posts.filter((current) => current.id === parseInt(postId));

  return (
    <>
      <PostContainer>
        {currentPost.map((current) => (
          <Post key={current.id} post={current} />
        ))}
        {user ? (
          <DeleteBtn onClick={handlePostDelete}>刪除文章</DeleteBtn>
        ) : null}
      </PostContainer>
    </>
  );
}
