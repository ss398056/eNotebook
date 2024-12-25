import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from "react-router";
import NoteContext from '../context/notes/noteContext';
import AlertContext from '../context/notes/alertContext';
function Navbar() {
    const naviator = useNavigate();
    const token = sessionStorage.getItem('token');
    const {setToken} = useContext(NoteContext);
    let location = useLocation();
    const alertContext = useContext(AlertContext);
    const {showAlert} = alertContext;
    //console.log(location);

    const handleLogoutClick = ()=>{
        //console.log("logout working");
        sessionStorage.removeItem('token');
        setToken('');
        showAlert('User logout successfully','success')
        naviator('/login');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    {/* eslint-disable-next-line */}
                    <Link className="navbar-brand" to="/"><img  src='/logo.png' style={{height:'40px', width:'40px'}} />eNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} to="/about">About</Link>
                            </li>
                            
                        </ul>
                        <div className='d-flex'>
                        {!token && <Link className={`nav-link text-light ${location.pathname==='/login '?'active':''}`} to="/login">Login/Signup</Link>}
                        {token && <button className="btn btn-primary" onClick={handleLogoutClick}>Logout</button>}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
