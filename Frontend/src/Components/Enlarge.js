import React from 'react'
import './Enlarge.css'
export default function Enlarge(props) {
    const note = props.note;
    return (
        <div id="enlargecontainer" className='container-fluid px-0 py-0 d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
            <div id='wrongicon'>
                <i id="xicon" className="fa-solid fa-xmark" role="button" onClick={() => { props.updateenlarge(null, {}) }}></i>
            </div>
            <div id="ecardid" className="card my-3 m-auto">
                <div id="tagcontainerenlarge" className="d-flex align-items-center mx-0 my-0" style={{
                    position: 'absolute',
                    width: "100.5%",
                    top: '-0.85px',
                    left: '-1.3px',
                    right: 0,
                    backgroundColor: 'red',
                    borderRadius: 'inherit'
                }}>
                    <span className='m-auto'>
                        {note && note.tag}
                    </span>
                </div>
                <div className="card-body">
                    <h5 className="card-title " id="enotetitle" >{note && note.title}</h5>
                    <p className="card-text" id="enotedescription" >{note && note.description} </p>
                    <p className="card-text" id='enotedate'><small >Created on {new Date(note && note.date).toLocaleString()}</small></p>

                </div>
            </div>
        </div>
    )
}
