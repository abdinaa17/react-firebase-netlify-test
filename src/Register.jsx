import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "./context";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await registerUser(email, password);
      navigate("/login");
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
        onSubmit={handleRegister}
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
        <input
          type="password"
          name=""
          id="confirmPassword"
          style={{ margin: ".5rem 0", width: "250px" }}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="off"
        />
        <button
          style={{ margin: ".5rem 0", width: "250px", cursor: "pointer" }}
          type="submit"
          disabled={loading}
        >
          Register
        </button>
      </form>
      <div
        style={{
          margin: "1rem 0",
        }}
      >
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
