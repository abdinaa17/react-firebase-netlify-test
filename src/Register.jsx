import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import spinner from "./spinner.svg";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
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
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      const newUser = {
        email,
        timestamp: serverTimestamp(),
      };
      await setDoc(doc(db, "users", user.uid), newUser);
      navigate("/login");
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  if (loading) {
    return <img src={spinner} alt="" />;
  }
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
