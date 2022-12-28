import { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

export default function CreatePost() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Sammi " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title: title,
          body: body,
          pic: url,
        }),
      })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              M.toast({ html: data.error, classes: "#ff1744 red accent-3" });
            } else {
              M.toast({
                html: "You have successfully added a post",
                classes: "#2e7d32 green darken-3",
              });
              history.push("/");
            }
          });
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Instagram");
    data.append("cloud_name", "dwrkystxg");
    fetch("https://api.cloudinary.com/v1_1/dwrkystxg/image/upload", {
      method: "post",
      body: data,
    })
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
      <div className="cardBody">
        <div className="card cardPost">
          <div className="card-image">
            <img
                alt="imgPost"
                src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60"
            />
            <span className="card-title">Post</span>
          </div>
          <div className="card-content">
            <div className="input-field col s6">
              <i className="material-icons prefix">subtitles</i>
              <input
                  id="icon_prefix"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="icon_prefix">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">content_paste</i>
              <input
                  id="icon_prefix"
                  type="text"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
              />
              <label htmlFor="icon_prefix">Post</label>
            </div>
            <div className="file-field input-field">
              <div className="btn #0d47a1 blue darken-4">
              <span>
                <i className="material-icons">add</i>
              </span>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="file-path-wrapper">
                <input
                    className="file-path validate"
                    type="text"
                    placeholder="Add Profile Picture"
                />
              </div>
            </div>
            <button
                className="btn #0d47a1 blue darken-4"
                onClick={() => postDetails()}
            >
              Add Post
            </button>
          </div>
        </div>
      </div>
  );
}
