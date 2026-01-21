import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard'; 
import About from './About';  // Temp
import JobDetails from './components/JobDetails'

function App() {
  return (
    <div className="app-container">
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Routes>
    </div>
  );
}

export default App;