import { Link } from "react-router-dom";

export default function SignUp() {
  const postData = () => {
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "",
        email: "",
        password: "",
      }),
    })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
  };
  return (
      <div className="mycard">
        <div className="card card__auth ">
          <h2>Instagram</h2>
          <div className="input-field col s6">
            <i className="material-icons prefix">verified_user</i>
            <input id="icon_prefix" type="text" class="validate" />
            <label for="icon_prefix">Name</label>
          </div>
          <div className="input-field col s6">
            <i className="material-icons prefix">email</i>
            <input id="icon_prefix" type="text" class="validate" />
            <label for="icon_prefix">Email</label>
          </div>
          <div className="input-field col s6">
            <i className="material-icons prefix">password</i>
            <input id="icon_prefix" type="text" class="validate" />
            <label for="icon_prefix">Password</label>
          </div>
          <button
              onClick={() => postData()}
              className="waves-effect waves-light btn #0d47a1 blue darken-4"
          >
            Create Account
          </button>

          <p>
            <Link to="/signin">Already have an account?</Link>
          </p>
        </div>
      </div>
  );
}