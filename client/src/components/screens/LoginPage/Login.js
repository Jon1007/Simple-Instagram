import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../App";
import M from "materialize-css";

export default function Login(props) {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const {
    logEmail,
    logPassword,
    setLogEmail,
    setLogPassword,
    clicked,
    setClicked,
  } = props;
  const LogData = () => {
    if (
        // eslint-disable-next-line
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            logEmail
        )
    ) {
      M.toast({
        html: "Please enter your email address correctly",
        classes: "#ff1744 red accent-3",
      });
      return;
    }

    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: logPassword,
        email: logEmail,
      }),
    })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#ff1744 red accent-3" });
          } else {
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch({ type: "USER", payload: data.user });
            M.toast({
              html: "You have successfully logged in",
              classes: "#2e7d32 green darken-3",
            });
            history.push("/");
          }
        });
  };
  return (
      <div className="form">
        <h2>Log in</h2>
        <input
            type="email"
            placeholder="Email"
            value={logEmail}
            onChange={(e) => setLogEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={logPassword}
            onChange={(e) => setLogPassword(e.target.value)}
        />
        <button className="btn" onClick={() => LogData()}>
          Login to Profile
        </button>
        <p className="signup">
          Don't have an account?{/* eslint-disable-next-line */}
          <a href="#" onClick={() => setClicked(!clicked)}>
            Create Account
          </a>
        </p>
      </div>
  );
}