import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError("Login failed. Please check credentials.");
    //   console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={styles.input}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}

      <button onClick={handleRegisterClick} style={styles.registerButton}>
        Register
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f7f7f7",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  registerButton: {
    marginTop: "15px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  registerButtonHover: {
    backgroundColor: "#0056b3",
  },
};

export default Login;
