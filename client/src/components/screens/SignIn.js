import { useState, useEffect } from "react";
import "./css/SignIn.css";
import M from "materialize-css";
import Login from "./LoginPage/Login";

export default function SignIn() {
  const [regName, setRegName] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [image, setImage] = useState(undefined);
  const [url, setUrl] = useState(
      "https://res.cloudinary.com/dtabxocmw/image/upload/v1635099407/78-785827_user-profile-avatar-login-account-male-user-icon_kmmxgw.jpg"
  );

  const uploadPicture = () => {
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

  const ourFields = () => {
    if (
        // eslint-disable-next-line
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            regEmail
        )
    ) {
      M.toast({
        html: "Please enter your email address correctly",
        classes: "#ff1744 red accent-3",
      });
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: regName,
        password: regPassword,
        email: regEmail,
        pic: url,
      }),
    })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#ff1744 red accent-3" });
          } else {
            M.toast({ html: data.msg, classes: "#2e7d32 green darken-3" });
            setClicked(!clicked);
          }
        });
  };

  const postData = () => {
    if (image) {
      uploadPicture();
    } else {
      ourFields();
    }
  };

  useEffect(() => {
    if (url) {
      ourFields();
    }
  }, [url]);

  return (
      <>
        <section>
          <div className={clicked ? "container active" : "container"}>
            <div className="user signinBx">
              <div className="imgBx">
                <img
                    src="https://images.unsplash.com/photo-1611162618758-2a29a995354b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bG9naW4lMjBpbnN0YWdyYW18ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt="sign"
                />
              </div>
              <div className="formBx">
                <Login
                    logEmail={logEmail}
                    logPassword={logPassword}
                    setLogEmail={setLogEmail}
                    setLogPassword={setLogPassword}
                    clicked={clicked}
                    setClicked={setClicked}
                />
              </div>
            </div>
            <div className="user signupBx">
              <div className="formBx">
                <div className="form">
                  <h2 style={{ margin: 0 }}>Create Account</h2>
                  <div className="containers">
                    <img
                        src="https://res.cloudinary.com/dtabxocmw/image/upload/v1635099407/78-785827_user-profile-avatar-login-account-male-user-icon_kmmxgw.jpg"
                        alt="Avatar"
                        className="images"
                    />
                    <div className="middles">
                      <button
                          onClick={() => setIsOpenModal(true)}
                          className="btn #0d47a1 blue darken-4"
                      >
                        <i className="material-icons">add_a_photo</i>
                      </button>
                    </div>
                  </div>
                  <input
                      type="text"
                      placeholder="Name"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                  />
                  <input
                      type="email"
                      placeholder="Email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                  />
                  <input
                      type="password"
                      placeholder="Password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                  />

                  <button
                      className="btn #0d47a1 blue darken-4"
                      onClick={() => postData()}
                  >
                    Create Account
                  </button>
                  <p className="signup">
                    Akauntingiz bormi?{/* eslint-disable-next-line */}
                    <a href="#" onClick={() => setClicked(!clicked)}>
                      Akauntga kirish
                    </a>
                  </p>
                </div>
              </div>
              <div className="imgBx">
                <img
                    alt="sign"
                    src="https://images.unsplash.com/photo-1535451801241-b5395e1d4a1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG9naW4lMjBpbnN0YWdyYW18ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                />
              </div>
            </div>
          </div>
          {isOpenModal ? (
              <div className="modalS" onClick={() => setIsOpenModal(false)}>
                <div
                    className="modalS__content"
                    onClick={(e) => e.stopPropagation()}
                >
                  <div className="modalHeader">
                    <h4>Add Your Account Photo</h4>
                    <i
                        style={{ cursor: "pointer", color: "#0d47a1" }}
                        onClick={() => setIsOpenModal(false)}
                        className="small material-icons "
                    >
                      close
                    </i>
                  </div>
                  <div className="modalConten">
                    <div className="file-field input-field">
                      <div className="btn #0d47a1 blue darken-4">
                    <span>
                      <i className="material-icons">add_a_photo</i>
                    </span>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                      </div>
                      <div class="file-path-wrapper">
                        <input
                            class="file-path validate"
                            type="text"
                            placeholder="You Photo"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modalFooter">
                    <button
                        className="btn #0d47a1 blue darken-4"
                        onClick={() => setIsOpenModal(false)}
                    >
                      Save Image
                    </button>
                  </div>
                </div>
              </div>
          ) : null}
        </section>
      </>
  );
}