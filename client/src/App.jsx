import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [message, setMessage] = useState("Loading...");
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("/api/home") 
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message); 
        setPeople(data.people);   
      });
  }, []); 

  return (
    <div>
      <h1>Job Hunter Dashboard</h1>
      <p>Server says: {message}</p>
      
      <h2>People List:</h2>
      {people.map((person, index) => (
        <div key={index}>{person}</div>
      ))}
    </div>
  );
}

export default App;