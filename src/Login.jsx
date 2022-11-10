import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./context";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await loginUser(email, password);
      navigate("/");
    } catch (err) {
      const errorMessage = err.code.split("/")[1];
      setError(errorMessage);
    }
    setLoading(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="error">{error && <p className="alert">{error}</p>}</div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleLogin}
      >
        <input
          style={{ margin: ".5rem 0", width: "250px" }}
          type="email"
          name=""
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <input
          style={{ margin: ".5rem 0", width: "250px" }}
          type="password"
          name=""
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        <button
          style={{ margin: ".5rem 0", width: "250px", cursor: "pointer" }}
          type="submit"
        >
          Log In
        </button>
      </form>
      <div
        style={{
          margin: "1rem 0",
        }}
      >
        <p>
          Don't have an account? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
