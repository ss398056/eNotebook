import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';
const ProtectedRoute = ({ children }) => {
    const {token} = useContext(NoteContext);
    //const token = sessionStorage.getItem('token'); // Replace with your token logic
    //console.log(token);
    return token ? children : <Navigate to="/login" />;
};

const ProtectedLoginRoute = ({ children }) => {
    const {token} = useContext(NoteContext);
    //const token = sessionStorage.getItem('token'); // Replace with your token logic
    //console.log(token);
    return token ? <Navigate to="/" /> : children ;
};

export {ProtectedRoute, ProtectedLoginRoute};
