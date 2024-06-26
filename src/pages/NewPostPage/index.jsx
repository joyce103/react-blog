import styled from "styled-components";
import React, { useState } from "react";
import { addPost } from "../../WebAPI";
import { MEDIA_QUERY_MOBILE } from "../../constants/breakpoint";

const NewPostForm = styled.form`
  width: 500px;
  margin: 50px auto;
  padding: 30px 0;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${MEDIA_QUERY_MOBILE} {
    width: 90%;
  }
  button {
    border: 1px solid #000000;
    border-radius: 10px;
    background: transparent;
    padding: 2px 20px;
    font-size: 1.2rem;
    margin-top: 20px;
    &:hover {
      background: #eee;
      cursor: pointer;
    }
  }
`;
const FormInput = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  margin: 5px 0;
  p {
    margin-bottom: 5px;
    font-size: 1.2rem;
  }
`;
const ButtonGroup = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  button {
    margin: 30px 0px 0 5px;
  }
`;

export default function NewPostPage() {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const handleInputClear = (e) => {
    e.preventDefault();
    setPostTitle("");
    setPostContent("");
  };
  const handlePostCreate = (e) => {
    e.preventDefault();
    addPost(postTitle, postContent);
    setPostTitle("");
    setPostContent("");
    alert("新增成功!");
  };

  return (
    <NewPostForm>
      <h1>新增文章</h1>
      <FormInput>
        <p>Title</p>
        <input
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          placeholder="請輸入標題"
          type="textarea"
        />
      </FormInput>
      <FormInput>
        <p>Content</p>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="請輸入文章內容"
          rows="15"
        ></textarea>
      </FormInput>
      <ButtonGroup>
        {postTitle || postContent ? (
          <button onClick={handleInputClear}>清空</button>
        ) : null}
        {postTitle && postContent ? (
          <button onClick={handlePostCreate}>發布</button>
        ) : null}
      </ButtonGroup>
    </NewPostForm>
  );
}
