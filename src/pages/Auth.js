import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API = "https://expense-tracker-react-sh1t.onrender.com";

  const register = async () => {
    try {

      await axios.post(
        `${API}/auth/register`,
        {
          email,
          password
        }
      );

      alert("Registered Successfully");

    } catch (err) {

   console.log(err);

alert(
  err.response?.data?.message ||
  err.message ||
  "Something went wrong"
);
    }
  };

  const login = async () => {
    try {

      const res = await axios.post(
        `${API}/auth/login`,
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
  "userEmail",
  email
);

      alert("Login Success");

      navigate("/dashboard");

    } catch (err) {

    console.log(err);

alert(
  err.response?.data?.message ||
  err.message ||
  "Something went wrong"
);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8"
      }}
    >

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          width: "300px",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >

        <h1>Auth Page 🔐</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
        autoComplete="new-email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
         autoComplete="new-password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <button
          onClick={register}
          style={{
            padding: "10px",
            width: "100%",
            marginBottom: "10px"
          }}
        >
          Register
        </button>

        <button
          onClick={login}
          style={{
            padding: "10px",
            width: "100%"
          }}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Auth;