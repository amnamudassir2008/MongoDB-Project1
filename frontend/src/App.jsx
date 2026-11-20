import { useEffect, useState } from "react";
import "./App.css";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
  });

  const [editId, setEditId] = useState(null);

  // Get All Students
const getStudents = async () => {
  try {
    const res = await fetch(API);
    const data = await res.json();

    console.log("Backend Response:", data);

    setStudents(
      Array.isArray(data) ? data : data.students || []
    );

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    getStudents();
  }, []);

  // Input Handle
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add / Update Student
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId ? `${API}/${editId}` : API;
    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert(editId ? "Student Updated!" : "Student Added!");

      setForm({
        name: "",
        email: "",
        age: "",
        course: "",
      });

      setEditId(null);
      getStudents();
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Student
  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      age: student.age,
      course: student.course,
    });

    setEditId(student._id);
  };

  // Delete Student
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      alert("Student Deleted!");
      getStudents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="age"
          type="number"
          placeholder="Enter Age"
          value={form.age}
          onChange={handleChange}
          required
        />

        <input
          name="course"
          placeholder="Enter Course"
          value={form.course}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editId ? "Update Student" : "Add Student"}
        </button>
      </form>

      <h2>All Students</h2>

      {students.map((student) => (
        <div className="student" key={student._id}>
          <h3>{student.name}</h3>
          <p>Email: {student.email}</p>
          <p>Age: {student.age}</p>
          <p>Course: {student.course}</p>

          <button onClick={() => handleEdit(student)}>
            Edit
          </button>

          <button onClick={() => handleDelete(student._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;