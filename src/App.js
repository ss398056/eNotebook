import './App.css';
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import AlertState from './context/notes/AlertState';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import { ProtectedRoute, ProtectedLoginRoute } from './components/ProtectedRoute';

function App() {

  return (
    <NoteState>
      <AlertState>
        <BrowserRouter>
          <Navbar />
          <Alert />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/login" element={
              <ProtectedLoginRoute>
                <Login />
              </ProtectedLoginRoute>
            } />
            <Route path="/signup" element={
              <ProtectedLoginRoute>
                <CreateAccount />
              </ProtectedLoginRoute>
            } />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </AlertState>
    </NoteState>

  );
}

export default App;
