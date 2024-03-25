import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            'Trying to handle heavy stuff in a child process to not block renderer'
          }
        />
      </Routes>
    </Router>
  );
}
