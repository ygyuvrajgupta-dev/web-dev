import { useState } from "react";
import Header from "./components/Header";
import StudentTable from "./components/StudentTable";
import AddStudentForm from "./components/AddStudentForm";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    
    
  ]);

  const updateScore = (id, newScore) => {
    setStudents(
      students.map((s) =>
        s.id === id ? { ...s, score: Number(newScore) } : s
      )
    );
  };

  const addStudent = (name, score) => {
    const newStudent = {
      id: Date.now(),
      name,
      score: Number(score),
    };
    setStudents([...students, newStudent]);
  };

  return (
    <div className="container">
      <Header />
      <AddStudentForm addStudent={addStudent} />
      <StudentTable students={students} updateScore={updateScore} />
    </div>
  );
}

export default App;