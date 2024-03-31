import { getAuthToken } from "./utils";

const BASE_URL = "https://student-json-api.lidemy.me";
const TOKEN = getAuthToken();

export const getPosts = () => {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`).then((res) =>
    res.json()
  );
};

export const getCurrentPost = (postId) => {
  return fetch(`${BASE_URL}/posts/${postId}?_expand=user`).then((res) =>
    res.json()
  );
};

export const userLogin = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const getMe = () => {
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${TOKEN}`,
    },
  }).then((res) => res.json());
};

export const addPost = (title, content) => {
  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      title: title,
      body: content,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      getPosts();
    })
    .catch((err) => console.log(err));
};

export const deletePost = (postId) => {
  return fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${TOKEN}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
