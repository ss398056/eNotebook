import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/noteContext'
import AlertContext from '../context/notes/alertContext'
function Login() {
    const {setToken} = useContext(NoteContext)
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const alertContext = useContext(AlertContext);
    const {showAlert} = alertContext;
    const naviator = useNavigate();
    
    const handleLoginClick = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/loginuser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user.email, password: user.password }),
            });
            const json = await response.json();
            //console.log(json.success);
            if (json.success) {
                setToken(json.authToken)
                sessionStorage.setItem('token',json.authToken);
                showAlert('User login successfully','success')
                naviator('/')
            } else {
                if(json.errors){
                    showAlert(json.errors[0].msg,'danger')
                }else{
                    showAlert(json.error,'danger')
                }
                
                //console.log(json);
            }
        } catch (err) {
            console.log(err);
        }


    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card shadow-lg">
                            <div className="card-header text-center">
                                <h3>Login</h3>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary w-100" onClick={handleLoginClick}>Login</button>
                                    </div>
                                    
                                </form>
                                <p className="text-center">Don't have an account? <Link to="/signup">Sign up here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
