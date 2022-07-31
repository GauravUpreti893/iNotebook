import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressContext from '../Context/Progress/ProgressContext';
import './LandingPage.css';
export default function LandingPage() {
  const navigate = useNavigate();
  const context = useContext(ProgressContext);
  const { changeprogress, loading } = context;
  useEffect(() => {
    localStorage.getItem('auth-token') && navigate('/home');
    changeprogress(30);
    setTimeout(async () => {
      changeprogress(60);
    }, 300);
    setTimeout(async () => {
      changeprogress(100);
    }, 300);
    // eslint-disable-next-line
  }, [])

  return (
    !loading && <div className='container-fluid px-0 mx-0 py-0 my-0 d-flex justify-content-center align-items-center flex-column' id="landing">
      <div id="first">Welcome to iNotebook</div>
      <div id="second">Your one and only place for storing and maintaining notes</div>
      <div id="third">Please Login/Signup to Continue...</div>
    </div>
  )
}
