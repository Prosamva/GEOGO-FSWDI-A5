import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import PostList from "./Components/PostList";
import WriteCard from "./Components/WriteCard";
import { VscAdd, VscRefresh, VscSearch } from "react-icons/vsc";

const serverUrl = "https://posts-app-server.herokuapp.com/posts/";
const defaultValues = {
  title: "",
  content: "",
  author: "Anonymous",
  id: null,
  h: "Add Post",
};

function App() {
  const [posts, setPosts] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const [showNoneFound, setShowNoneFound] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const set = (name, value) =>
    setValues((oldValues) => ({ ...oldValues, [name]: value }));
  const dismissModal = () => setShowModal(false);

  const getPosts = () => {
    axios
      .get(serverUrl)
      .then((res) => setPosts(res.data))
      .catch((error) => console.log(error));
  };
  useEffect(getPosts, []);

  const onFormSubmit = () => {
    dismissModal();
    const id = values.id;
    const saveVals = {
      title: values.title,
      content: values.content,
      author: values.author,
    };
    if (id == null) {
      axios
        .post(serverUrl, saveVals)
        .then((res) => setPosts(res.data))
        .catch((error) => console.log(error));
    } else {
      axios
        .put(serverUrl + id, saveVals)
        .then((res) => setPosts(res.data))
        .catch((error) => console.log(error));
    }
    setValues(defaultValues);
    getPosts();
  };

  const addPost = () => {
    setValues(defaultValues);
    setShowModal(true);
  };

  const editPost = (newValues) => {
    newValues.h = "Edit Post";
    setValues(newValues);
    setShowModal(true);
  };

  const deletePost = (id) => {
    axios
      .delete(serverUrl + id)
      .then(() => setPosts(posts.filter((post) => post._id !== id)))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <nav>
        <div className="nav-brand">POSTS</div>
        <div className="nav-text">
          <small>by</small> SAMUEL VASAMSETTI
        </div>
      </nav>
      <div className="options">
        <div className="search-form">
          <VscSearch className="search-icon" />
          <input
            id="SearchInput"
            type="text"
            className="search-field"
            placeholder="Search..."
            onChange={({ target: { value } }) => setSearchText(value)}
          ></input>
        </div>
        <div>
          <button className="button" onClick={addPost}>
            <VscAdd className="icon" /> Add Post
          </button>
          <button
            className="button"
            onClick={() => {
              document.getElementById("SearchInput").value = "";
              setSearchText("");
              getPosts();
            }}
          >
            <VscRefresh className="icon" /> Refresh
          </button>
        </div>
        <div className={showNoneFound ? "nom show" : "nom"}>None found.</div>
      </div>
      <div id="p1" className={showModal ? "overlay show" : "overlay"} href="#">
        <WriteCard
          title={values.title}
          content={values.content}
          author={values.author}
          heading={values.h}
          _onSubmit={onFormSubmit}
          _handleCloseModal={dismissModal}
          _handleValues={set}
        />
      </div>
      <PostList
        id="PostList"
        posts={posts.filter((post) => {
          var val = post.title + post.content + post.author
          return val.toLowerCase().includes(searchText)
        })}
        _handleNoneMessage={setShowNoneFound}
        _handleEditPost={editPost}
        _handleDeletePost={deletePost}
      />
    </div>
  );
}

export default App;