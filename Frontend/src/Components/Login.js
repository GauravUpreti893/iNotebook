import React, { useState, useContext, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../Context/Alert/AlertContext';
import ProgressContext from '../Context/Progress/ProgressContext';
import './Login.css'
export default function Login() {
    const context = useContext(AlertContext);
    const { showAlert } = context;
    const [credentials, setcredentials] = useState({ lusername: "", lpassword: "" });
    const changeHandler = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const navigate = useNavigate();
    const context1 = useContext(ProgressContext);
    const { changeprogress, loading, updateloading } = context1;
    const submithandler = async (e) => {
        updateloading(true);
        changeprogress(30);
        e.preventDefault();
        const url = "https://inotebookbackendapp.herokuapp.com/api/auth/login";
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
                body: JSON.stringify({ username: credentials.lusername, password: credentials.lpassword })
            });
            changeprogress(70);
            const json = await response.json();
            changeprogress(90);
            if (json.success) {
                localStorage.setItem('auth-token', json.token);
                changeprogress(100);
                updateloading(false);
                navigate('/home');
                showAlert("Logged in Successfully!", "success");
                setcredentials({ lusername: "", lpassword: "" });
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
    const resizehandler1 = () => {
        if (window.innerHeight < 500) {
            document.getElementById('logincontainer') && document.getElementById('logincontainer').classList.add('active');
        }
        else
            document.getElementById('logincontainer') && document.getElementById('logincontainer').classList.remove('active');
    }
    window.addEventListener('resize', resizehandler1);
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
    const handleEnter1 = (event) => {
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    }
    return (
        !loading && <div id="logincontainer">
            <h2>Login</h2>
            <form onSubmit={submithandler} id="loginform">
                <div id='loginbox'>
                    <div className="mb-3">
                        <label htmlFor="lusername" className="form-label">Username</label>
                        <input type="text" className="form-control" id="lusername" name="lusername" ref={inputReference} onKeyDown={handleEnter1} value={credentials.lusername} onChange={changeHandler} minLength={3} required tabIndex={1} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lpassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="lpassword" name="lpassword" onKeyDown={handleEnter1} value={credentials.lpassword} onChange={changeHandler} minLength={5} required tabIndex={2} />
                    </div>
                </div>
                <button id="subbutton" type="submit" className="btn btn-primary" tabIndex={3}>Login</button>
            </form>
        </div>
    )
}
