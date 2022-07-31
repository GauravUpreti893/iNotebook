import React, { useContext } from 'react';
import NotesContext from '../Context/Notes/NotesContext';
import ProgressContext from '../Context/Progress/ProgressContext';
import './NoteItem.css'
export default function NoteItem(props) {
    const note = props.note;
    const context = useContext(NotesContext);
    const { deleteNotes } = context;
    const context1 = useContext(ProgressContext);
    const { loading } = context1;
    return (
        !loading && <div className={`col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3}`} key={note._id}>
            <div id="notebox" className="card my-3 m-auto" style={{ backgroundColor: '#1F1F1F', color: 'white', width: "20rem", height: "250px" }}>
                <div id="tagcontainer" className="d-flex align-items-center mx-0 my-0" style={{
                    position: 'absolute',
                    width: "100.5%",
                    top: '-0.85px',
                    left: '-1.3px',
                    right: 0,
                    backgroundColor: 'red',
                    borderRadius: 'inherit'
                }}>
                    <span className='mx-1'>
                        {note.tag.length > 26 ? note.tag.slice(0, 26) + '...' : note.tag}
                    </span>
                    <span id='end' className="d-flex align-items-center">
                        <i className="fa-solid fa-trash-can mx-2" role="button" onClick={() => { deleteNotes(note._id) }}></i>
                        <i className="fa-solid fa-pen-to-square" role="button" onClick={() => { props.updatenote(note) }}></i>
                        <ion-icon name="expand" alt="Expand" role="button" id="enlarge" onClick={() => { props.updateenlarge('active', props.note) }}></ion-icon>
                    </span>
                </div>
                <div className="card-body">
                    <h5 className="card-title overflow-hidden " id="notetitle" style={{ maxHeight: "70px", wordBreak: "break-all" }}>{(note.title.length > 54) ? note.title.slice(0, 54) + "..." : note.title}</h5>
                    <p className="card-text overflow-hidden" id="notedescription" style={{ wordBreak: "break-all" }}>{(note.description.length > 130) ? note.description.slice(0, 130) + "..." : note.description} </p>
                    <p className="card-text" id='notedate'><small style={{ position: 'absolute', bottom: '10px' }}>Created on {new Date(note.date).toLocaleString()}</small></p>

                </div>
            </div>
        </div>
    )
}
