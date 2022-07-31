import React, { useContext, useEffect, useState, useRef } from 'react';
import NotesContext from '../Context/Notes/NotesContext';
import NoteItem from './NoteItem';
import AlertContext from '../Context/Alert/AlertContext';
import ProgressContext from '../Context/Progress/ProgressContext';
import { useNavigate } from 'react-router-dom'
import './Home.css'
export default function Home(props) {
  const navigate = useNavigate();
  const context = useContext(NotesContext);
  const { notes, getNotes, updateNotes } = context;
  const context1 = useContext(AlertContext);
  const { showAlert } = context1;
  const context2 = useContext(ProgressContext);
  const { changeprogress, loading, updateloading } = context2;
  const inputReference1 = useRef(null);
  const ref = useRef(null);
  const refClose = useRef(null);
  const refSubmit = useRef(null);
  const search = props.search;
  useEffect(() => {
    !localStorage.getItem('auth-token') && navigate('/');
    inputReference1.current.focus();
    async function fetchData() {
      updateloading(true);
      changeprogress(30);
      await getNotes();
      changeprogress(100);
      updateloading(false);
    }
    fetchData();
    // eslint-disable-next-line
  }, [])

  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const [tempnote, settempnote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const changehandler = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  }
  const submithandler = async (e) => {
    e.preventDefault();
    const listener = e => { if (e.keyIdentifier === 'U+000A' || e.keyIdentifier === 'Enter' || e.keyCode === 13) { if (e.target.nodeName === 'INPUT' && e.target.type !== 'textarea') { e.preventDefault(); return false; } } };
    document.addEventListener('keydown', listener, true);
    if (note.etitle === tempnote.etitle && note.edescription === tempnote.edescription) {
      let t = note.etag;
      if (t === '') {
        t = 'General';
      }
      console.log(t);
      if (t === tempnote.etag)
        showAlert("No changes to save", "info");
      else
        updateNotes(note.id, note.etitle, note.edescription, note.etag);
    }
    else
      updateNotes(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();

  }
  const submitform = () => {
    refSubmit.current.click();
  }
  const updatenote = (cnote) => {
    ref.current.click();
    setnote({ id: cnote._id, etitle: cnote.title, edescription: cnote.description, etag: cnote.tag });
    settempnote({ id: cnote._id, etitle: cnote.title, edescription: cnote.description, etag: cnote.tag });
  }
  const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }
  return (
    !loading && <div id="homecontainer" className=' pb-4'>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
        Update Note
      </button>

      <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content bigupdate">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel1">Update Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="updatenotemodal" className="modal-body">
              <form onSubmit={submithandler}>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" ref={inputReference1} onKeyDown={handleEnter} aria-describedby="emailHelp" value={note.etitle} onChange={changehandler} minLength={3} required tabIndex={1} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" onKeyDown={handleEnter} value={note.edescription} onChange={changehandler} minLength={5} required tabIndex={2} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" onKeyDown={handleEnter} value={note.etag} onChange={changehandler} tabIndex={3} />
                </div>
                <button ref={refSubmit} type="submit" className="btn btn-primary d-none" tabIndex={4} >Update Note</button>
              </form>
            </div>
            <div className="modal-footer">
              <button id="closebutton" ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={submitform}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div id="notescontainerbig" className="row my-1" style={{ minHeight: '100vh', maxWidth: '100%' }}>
        <h2 className='text-center' style={{ fontSize: '40px', fontWeight: '800', color: 'black' }}>Your Notes</h2>
        {(notes.length === 0) && <div id="emptymess">
          No notes to display
        </div>
        }
        {notes && notes.map((note) => {
          return ((search === '') || ((((note.title).toUpperCase()).includes(search)) || (((note.tag).toUpperCase())).includes(search))) && <NoteItem note={note} key={`${note._id}`} id={note._id} updatenote={updatenote} updateenlarge={props.updateenlarge} />;
        })}
      </div>
    </div>
  )
}
