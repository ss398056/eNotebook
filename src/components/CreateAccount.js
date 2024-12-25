import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/notes/alertContext';

function CreateAccount() {
    const naviator = useNavigate();
    const alertContext = useContext(AlertContext);
    const {showAlert} = alertContext;
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSignupClick = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name:user.name, email: user.email, password: user.password }),
            });
            const json = await response.json();
            //console.log(json);
            if (json.authToken) {
                naviator('/login')
                showAlert('User created successfully', 'success')
            } else {
                if(json.errors){
                    showAlert(json.errors[0].msg, 'danger')
                }else{
                    showAlert(json.error, 'danger')
                }
                
                //console.log(json);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    return (

        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg">
                            <div className="card-header text-center">
                                <h3>Create Account</h3>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Full Name</label>
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter your full name" onChange={onChange} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" onChange={onChange} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" name="password" placeholder="Enter a password" onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary w-100" onClick={handleSignupClick}>Create Account</button>
                                    </div>
                                </form>
                                <p className="text-center">Already have an account? <Link to="/login">Login here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )

}

export default CreateAccount
