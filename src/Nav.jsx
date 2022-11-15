import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
const Nav = () => {
  const [user] = useAuthState(auth);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Log out user function
  const handleLogout = async () => {
    setError("");
    try {
      await auth.signOut();

      navigate("/login");
    } catch (err) {
      const errorMessage = err.code;
      setError(errorMessage);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Link to="/">
        <h2>LISTERS</h2>
      </Link>
      <Link to="/create-listing">
        <h2>Create listing</h2>
      </Link>
      {user ? (
        <button style={{ cursor: "pointer" }} onClick={handleLogout}>
          Log out
        </button>
      ) : (
        <Link to="/login" className="login">
          <button style={{ cursor: "pointer" }}>Log in</button>
        </Link>
      )}
    </div>
  );
};

export default Nav;
