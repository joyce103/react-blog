import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPosts } from "../../WebAPI";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Root = styled.div``;

const PostContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  margin: 0 auto;
`;

const PostTitle = styled(Link)`
  color: #000;
  text-decoration: none;
`;

const PostDate = styled.div``;

function Post({ post }) {
  const { id, title, createdAt } = post;

  return (
    <PostContainer>
      <PostTitle to={`/posts/${id}`}>{title}</PostTitle>
      <PostDate>{new Date(createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}
Post.protoType = {
  post: PropTypes.object,
};

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((post) => setPosts(post));
  }, []);
  return (
    <Root>
      {posts.map((post) => (
        <Post key={post.id} post={post}></Post>
      ))}
    </Root>
  );
}
