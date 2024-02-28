import styled from "styled-components";
import React, { useState } from "react";
import { AddPost } from "../../WebAPI";

const NewPostForm = styled.form`
  width: 500px;
  margin: 50px auto;
  padding: 30px 0;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  width: 270px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 1.2rem;
  margin: 5px 0;
`;
const ButtonGroup = styled.div`
  width: 270px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  button {
    margin: 30px 0px 0 5px;
  }
`;

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleInputClear = (e) => {
    e.preventDefault();
    setTitle("");
    setContent("");
  };
  const handlePostAdd = (e) => {
    e.preventDefault();
    AddPost(title, content);
    setTitle("");
    setContent("");
    alert("新增成功!");
  };

  return (
    <NewPostForm>
      <h1>新增文章</h1>
      <FormInput>
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="請輸入標題"
          type="textarea"
        />
      </FormInput>
      <FormInput>
        Content
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="請輸入文章內容"
          rows="5"
          cols="21"
        ></textarea>
      </FormInput>
      <ButtonGroup>
        {title || content ? (
          <button onClick={handleInputClear}>清空</button>
        ) : null}
        {title && content ? (
          <button onClick={handlePostAdd}>發布</button>
        ) : null}
      </ButtonGroup>
    </NewPostForm>
  );
}
