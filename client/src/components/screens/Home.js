import { useState, useEffect, useContext } from "react";
import "./css/Home.css";
import HomeSideBar from "./HomeSideBar";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
    })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setData(result.posts);
        });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
        .then((res) => res.json())
        .then((result) => {
          // console.log(result);
          const newData = data.map((item) => {
            if (item._id === result._id) {
              return result;
            } else {
              return item;
            }
          });
          setData(newData);
        })
        .catch((err) => console.log(err));
  };

  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
        .then((res) => res.json())
        .then((result) => {
          // console.log(result);
          const newData = data.map((item) => {
            if (item._id === result._id) {
              return result;
            } else {
              return item;
            }
          });
          setData(newData);
        })
        .catch((err) => console.log(err));
  };

  const commentPost = (text, postId) => {
    fetch("/comments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          const newData = data.map((item) => {
            if (item._id === result._id) {
              return result;
            } else {
              return item;
            }
          });
          setData(newData);
        })
        .catch((err) => console.log(err));
  };

  const deletePost = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: "delete",
      headers: {
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
    })
        .then((res) => res.json())
        .then((result) => {
          const newData = data.filter((s) => s._id !== result._id);
          setData(newData);
        })
        .catch((err) => console.log(err));
  };

  return (
      <div className="home">
        <div className="post__items">
          <div className="left__side">
            {data
                .map((item) => {
                  return (
                      <div className="card" key={item._id}>
                        <Link
                            to={
                              item.postedBy._id !== state._id
                                  ? "/profile/" + item.postedBy._id
                                  : "/profile"
                            }
                        >
                          <p className="card-title postedBy">{item.postedBy.name}</p>
                        </Link>
                        <div className="card-image">
                          <img src={item.photo} alt={item._id} />
                        </div>
                        <div className="card-content">
                          {item.likes.includes(state._id) ? (
                              <button className="btn">
                                <i
                                    className="material-icons"
                                    onClick={() => unlikePost(item._id)}
                                >
                                  thumb_down
                                </i>
                              </button>
                          ) : (
                              <button className="btn">
                                <i
                                    className="material-icons"
                                    onClick={() => likePost(item._id)}
                                >
                                  thumb_up
                                </i>
                              </button>
                          )}
                          <button
                              style={{ margin: "0 10px" }}
                              className=" material-icons btn"
                              onClick={() => setShowComments(!showComments)}
                          >
                            comment
                          </button>
                          <a href="#">
                            {item.postedBy._id === state._id && (
                                <i
                                    onClick={() => deletePost(item._id)}
                                    className="material-icons btn"
                                >
                                  delete_forever
                                </i>
                            )}
                          </a>
                          <p>{item.likes.length} likes</p>
                          <h4 style={{ margin: 0 }}>{item.title}</h4>
                          <p style={{ marginTop: 5 }}>
                            <b>{item.body}</b>
                          </p>
                          {showComments ? (
                              item.comments.map((s) => (
                                  <div className="commentPost">
                                    <h6>{s.text}</h6>
                                    <p>
                                      Posted By <b>{s.postedBy.name}</b>
                                    </p>
                                  </div>
                              ))
                          ) : (
                              <p style={{ opacity: 0.6 }}>
                                Comments: {item.comments.length}
                              </p>
                          )}
                          <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                commentPost(e.target[0].value, item._id);
                                e.target[0].value = "";
                              }}
                          >
                            <input type="text" placeholder="Add A Comment" />
                          </form>
                        </div>
                      </div>
                  );
                })
                .reverse()}
          </div>
          <div className="right__side">
            <h4 style={{ color: "#000", fontFamily: "'Grand Hotel', cursive" }}>
              My Posts
            </h4>
            <HomeSideBar />
          </div>
        </div>
      </div>
  );
}