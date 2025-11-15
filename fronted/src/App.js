import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    regno: "",
    name: "",
    email: "",
    department: ""
  });

  const [message, setMessage] = useState(""); // <-- Success or Error message

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:2000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      setMessage("Student Added Successfully!");
      setFormData({ regno: "", name: "", email: "", department: "" });

      // Optional: remove message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Error: " + data.message);
    }
  };

  return (
    <div className="container">
      {message && <p className="msg">{message}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="heading">Register Student</h2>

        <label>Student Regno</label>
        <input
          type="number"
          name="regno"
          value={formData.regno}
          onChange={handleChange}
          placeholder="Student Regno"
          required
        />

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <label>Department</label>
        <input
          list="departments"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Select Department"
          required
        />

        <datalist id="departments">
          <option value="CSE" />
          <option value="ECE" />
          <option value="EEE" />
          <option value="MECH" />
          <option value="CIVIL" />
        </datalist>

        <button type="submit" className="btn">
          Add Student
        </button>
      </form>
    </div>
  );
}

export default App;