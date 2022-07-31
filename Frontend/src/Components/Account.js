import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './Account.css'
import AlertContext from "../Context/Alert/AlertContext";
import ProgressContext from '../Context/Progress/ProgressContext';
export default function Account() {
    const context = useContext(AlertContext);
    const showAlert = context.showAlert;
    const context1 = useContext(ProgressContext);
    const { changeprogress, updateloading, loading } = context1;
    const navigate = useNavigate();
    const [user, setuser] = useState({});
    const back = () => {
        navigate('/home');
    }
    useEffect(() => {
        const fetchuser = async () => {
            updateloading(true);
            const url = "https://inotebookbackendapp.herokuapp.com/api/auth/getuser";
            changeprogress(30);
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('auth-token')
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer'
                });
                changeprogress(70);
                const json = await response.json();
                changeprogress(100);
                updateloading(false);
                if (json.success) {
                    setuser(json.user);
                }
                else {
                    showAlert(json.error, "danger");
                }
            }
            catch {
                updateloading(false);
                changeprogress(100);
                showAlert("Internal Server Error", "danger");
            }
        }
        fetchuser();
        // eslint-disable-next-line
    }, [])
    return (
        !loading && <div id="accountcontainer">
            <h2>Your Account</h2>
            <div id='accountbox'>
                <div className="mb-3 d-flex">
                    <div className='ques'>
                        Name:
                    </div>
                    <div className='ans'>
                        {user.name}
                    </div>
                </div>
                <div className="mb-3 d-flex">
                    <div className='ques'>
                        Username:
                    </div>
                    <div className='ans'>
                        {user.username}
                    </div>
                </div>
                <div className="mb-3 d-flex">
                    <div className='ques'>
                        Email:
                    </div>
                    <div className='ans word-break'>
                        {user.email}
                    </div>
                </div>
            </div>
            <div>
                <button id="goback" className="btn btn-primary" onClick={back}>Go to Home Page</button>
            </div>
        </div>
    )
}
