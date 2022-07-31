import React, { useState, useContext, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../Context/Alert/AlertContext';
import ProgressContext from '../Context/Progress/ProgressContext';
import './Signup.css'
export default function Signup() {
    const context = useContext(AlertContext);
    const { showAlert } = context;
    const [credentials, setcredentials] = useState({ name: "", cusername: "", email: "", cpassword: "", ccpassword: "" });
    const changeHandler = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const navigate = useNavigate();
    const context1 = useContext(ProgressContext);
    const { changeprogress, updateloading, loading } = context1;
    const submithandler = async (e) => {
        e.preventDefault();
        const listener = e => { if (e.keyIdentifier === 'U+000A' || e.keyIdentifier === 'Enter' || e.keyCode === 13) { if (e.target.nodeName === 'INPUT' && e.target.type !== 'textarea') { e.preventDefault(); return false; } } };
        document.addEventListener('keydown', listener, true);
        if (credentials.cpassword !== credentials.ccpassword) {
            alert('Password and Confirm password should match');
            return;
        }
        updateloading(true);
        changeprogress(30);
        const url = YOUR_BACKEND_URL + "/api/auth/createuser";
        try {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({ name: credentials.name, username: credentials.cusername, email: credentials.email, password: credentials.cpassword })
            });
            changeprogress(70);
            const json = await response.json();
            changeprogress(90);
            if (json.success) {
                localStorage.setItem('auth-token', json.token);
                changeprogress(100);
                updateloading(false);
                navigate('/home');
                showAlert("Signed up Successfully!", "success");
                setcredentials({ name: "", cusername: "", email: "", cpassword: "", ccpassword: "" });
            }
            else {
                changeprogress(100);
                updateloading(false);
                showAlert(json.error, "danger");
            }
        }
        catch {
            changeprogress(100);
            updateloading(false);
            showAlert("Internal Server Error", "danger");
        }
    }
    const resizehandler = () => {
        if (window.innerHeight < 500) {
            document.getElementById('logincontainer') && document.getElementById('logincontainer').classList.add('active');
        }
        else
            document.getElementById('logincontainer') && document.getElementById('logincontainer').classList.remove('active');
    }
    window.addEventListener('resize', resizehandler);
    const inputReference = useRef(null);

    useEffect(() => {
        inputReference.current.focus();
        changeprogress(30);
        setTimeout(async () => {
            changeprogress(60);
        }, 300);
        setTimeout(async () => {
            changeprogress(100);
        }, 300);
        // eslint-disable-next-line
    }, []);
    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    }
    return (
        !loading && <div id="signupcontainer">
            <h2 id="signupheading">Sign Up</h2>
            <form onSubmit={submithandler} name="signupform" >
                <div id="signupbox">
                    <div id="part1">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name" onKeyDown={handleEnter} value={credentials.name} ref={inputReference} onChange={changeHandler} minLength={3} required tabIndex={1} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cusername" className="form-label">Username</label>
                            <input type="text" className="form-control" id="cusername" name="cusername" onKeyDown={handleEnter} value={credentials.cusername} onChange={changeHandler} minLength={3} required tabIndex={2} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" onKeyDown={handleEnter} aria-describedby="emailHelp" value={credentials.email} onChange={changeHandler} minLength={3} required tabIndex={3} />
                        </div>
                    </div>
                    <div id="part2">
                        <div className="mb-3">
                            <label htmlFor="cpassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="cpassword" name="cpassword" onKeyDown={handleEnter} value={credentials.cpassword} onChange={changeHandler} minLength={5} required tabIndex={4} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ccpassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="ccpassword" name="ccpassword" onKeyDown={handleEnter} value={credentials.ccpassword} onChange={changeHandler} minLength={5} required tabIndex={5} />
                        </div>
                    </div>
                </div>
                <button id="submitsignup" type="submit" className="btn btn-primary" tabIndex={6}>Sign Up</button>
            </form>
        </div>
    )
}
