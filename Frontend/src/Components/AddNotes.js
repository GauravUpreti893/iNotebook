import React, { useContext, useState, useRef, useEffect } from 'react';
import NotesContext from '../Context/Notes/NotesContext';
import ProgressContext from '../Context/Progress/ProgressContext';
import './AddNotes.css'
export default function AddNotes(props) {
    const context = useContext(NotesContext);
    const { addNotes } = context;
    const context1 = useContext(ProgressContext);
    const { loading } = context1;
    const [note, setnote] = useState({ title: "", description: "", tag: "" });

    //Function to update note, if any input's value is changed.
    const changehandler1 = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    }
    const submithandler1 = () => {
        refSubmit1.current.click();
    }
    const formsubmit = (e) => {
        e.preventDefault();
        addNotes(note.title, note.description, note.tag);
        setnote({ title: "", description: "", tag: "" });
        refClose1.current.click();
    }
    const inputReference2 = useRef(null);
    const ref1 = useRef(null);
    const refClose1 = useRef(null);
    const refSubmit1 = useRef(null);
    useEffect(() => {
        inputReference2.current.focus();
    }, [])

    useEffect(() => {
        if (props.doadd === 'yes') {
            ref1.current.click();
        }
    }, [props.doadd])


    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    }
    return (
        !loading && <div className='my-3 position-absolute'>
            <button type="button" ref={ref1} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Add Note
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bigadd" >
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { props.updatestate(null) }}></button>
                        </div>
                        <div id="addnotemodal" className="modal-body">
                            <form onSubmit={formsubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" ref={inputReference2} onKeyDown={handleEnter} value={note.title} aria-describedby="emailHelp" onChange={changehandler1} minLength={3} required tabIndex={1} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" onKeyDown={handleEnter} value={note.description} name="description" onChange={changehandler1} minLength={5} required tabIndex={2} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" onKeyDown={handleEnter} value={note.tag} name="tag" onChange={changehandler1} tabIndex={3} />
                                </div>
                                <button ref={refSubmit1} type="submit" className="btn btn-primary d-none" tabIndex={4} >Add Note</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose1} id="closebutton" type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { props.updatestate(null) }}>Close</button>
                            <button id="addnotebutton" type="button" className="btn btn-primary" onClick={submithandler1}>Add Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
