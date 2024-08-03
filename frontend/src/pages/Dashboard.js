import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFileContent(response.data.content);
    } catch (error) {
      setError("File upload failed. Please try again.");
    //   console.error("File upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Dashboard</h2>
      <input type="file" onChange={handleFileChange} style={styles.fileInput} />
      <button
        onClick={handleFileUpload}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {fileContent && (
        <div style={styles.fileContentContainer}>
          <h3 style={styles.fileContentTitle}>File Content</h3>
          <pre style={styles.fileContent}>{fileContent}</pre>
        </div>
      )}
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
  fileInput: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
    maxWidth: "300px",
    fontSize: "1rem",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    marginBottom: "20px",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  fileContentContainer: {
    marginTop: "20px",
    width: "100%",
    maxWidth: "600px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  fileContentTitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  fileContent: {
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    fontSize: "1rem",
    color: "#333",
  },
};

export default Dashboard;
