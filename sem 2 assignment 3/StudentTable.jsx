import StudentRow from "./StudentRow";

function StudentTable({ students, updateScore }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentRow
            key={student.id}
            student={student}
            updateScore={updateScore}
          />
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;