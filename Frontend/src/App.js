import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Components/Home';
import Spinner from './Components/Spinner';
import About from './Components/About';
import Navbar from './Components/Navbar';
import NotesStates from './Context/Notes/NotesStates';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Footer from './Components/Footer';
import AlertState from './Context/Alert/AlertState';
import ProgressState from './Context/Progress/ProgressState';
import LandingPage from './Components/LandingPage';
import Enlarge from './Components/Enlarge';
import AddNotes from './Components/AddNotes';
import Account from './Components/Account';
function App() {
  const [doadd, setdoadd] = useState(null);
  const [enlarge, setenlarge] = useState(null);
  const [enlargenote, setenlargenote] = useState({});
  function getYPosition() {
    var top = window.pageYOffset || document.documentElement.scrollTop
    return top;
  }
  const [x, setx] = useState(0)
  const updateenlarge = (params, tnote) => {
    if (!enlarge) {
      setx(getYPosition());
    }
    else {
      setTimeout(() => {
        window.scroll(0, x);
      }, 50);
    }
    setenlarge(params);
    setenlargenote(tnote);
  }
  const updatestate = (params) => {
    setdoadd(params);
  }
  const addnewnote = () => {
    setdoadd('yes');
  }
  const [search, setsearch] = useState('');
  const updatesearch = (params) =>{
    setsearch(params);
  }
  return (
    <ProgressState>
      <AlertState>
        <NotesStates>
          <div className='container-fluid px-0 py-0 d-flex flex-column' style={{ minHeight: '100vh' }}>
            <BrowserRouter>
              {!enlarge && <>
                <AddNotes doadd={doadd} updatestate={updatestate} />
                <Navbar addnewnote={addnewnote} updatesearch = {updatesearch}/>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/home" element={<Home updateenlarge={updateenlarge} note={enlargenote} search = {search}/>} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/account" element={<Account />} />
                </Routes>
                <Spinner />
                <Footer /> </>}
              {enlarge && <Enlarge updateenlarge={updateenlarge} note={enlargenote} />}

            </BrowserRouter>
          </div>
        </NotesStates>
      </AlertState>
    </ProgressState>
  );
}

export default App;
