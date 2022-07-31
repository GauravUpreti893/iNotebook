import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import AlertContext from "../Context/Alert/AlertContext";
// import ProgressContext from '../Context/Progress/ProgressContext';
// import LoadingBar from '@weblif/react-top-loading-bar'
import Alert from './Alert';
import './Navbar.css'
export default function Navbar(props) {
    let location = useLocation();
    const context = useContext(AlertContext);
    // const context1 = useContext(ProgressContext);
    // const { progress } = context1;
    const alert1 = context.alert;
    const { showAlert } = context;
    const navigate = useNavigate();
    const logouthandler = () => {
        const conf = window.confirm("Are you sure you want to Logout from this device?");
        if (conf) {
            localStorage.removeItem('auth-token');
            navigate('/');
            showAlert('Logout Successfully', "success");
        }
    }
    const accounthandler = () => {
        navigate('/account');
    }
    const addnewnote = props.addnewnote;
    const [searchdata, setsearchdata] = useState('');
    const searchsubmithandler = (e) => {
        e.preventDefault();
        props.updatesearch(searchdata.toUpperCase());
    }
    const changeHandler = (e) => {
        setsearchdata(e.target.value);
        if (e.target.value === '')
        props.updatesearch('');
    }
    return (
        <div>
            {/* <LoadingBar
                color='#29FD53'
                progress={progress}
                
            /> */}
            <nav className="navbar navbar-expand-lg navbar-dark sticky-top" id="navbar1" >
                <div className="container-fluid">
                    <Link className="navbar-brand active" to={`${location.pathname === '/home' ? "/home" : "/"}`}>iNotebook</Link>
                    <button id="togglerbutton" className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${(location.pathname === '/' || location.pathname === '/home') ? "active opacity-100" : ""}`} aria-current="page" to={`${location.pathname === '/home' ? "/home" : "/"}`}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {(location.pathname === '/home') && <form id="searchbar" className="d-flex" role="search" onSubmit={searchsubmithandler}>
                            <input id="searchinput" className="form-control me-2" type="search" placeholder="Search notes by Title or Tag" aria-label="Search" val={searchdata} onChange={changeHandler} required />
                            <button className="btn btn-outline-success" type="submit"><i id="searchicon" className="fa-solid fa-magnifying-glass"></i></button>
                        </form>
                        }
                        {localStorage.getItem('auth-token')
                            ? (location.pathname === '/home') ? <span> <i className="fa-solid fa-plus " id='plusicon' role="button" onClick={addnewnote}></i> <i className="fa-solid fa-circle-user" role="button" id="usericon" onClick={accounthandler}></i> <span className="btn btn-primary" role="button" style={{ marginLeft: "5.5px", marginRight: "5px" }} onClick={logouthandler}>Logout</span></span> : <span><i className="fa-solid fa-circle-user" role="button" id="usericon" onClick={accounthandler}></i> <span className="btn btn-primary" role="button" style={{ marginLeft: "5.5px", marginRight: "5px" }} onClick={logouthandler}>Logout</span></span>
                            : <span style={{ marginRight: "5px" }}> <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link> <Link className="btn btn-primary" to="/signup" role="button" style={{ marginLeft: "1px" }} >Signup</Link></span>
                        }

                    </div>
                </div>
            </nav>
            <Alert alert={alert1} />
        </div>
    )
}
