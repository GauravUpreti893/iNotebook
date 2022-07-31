import React, { useContext, useState } from 'react';
import NotesContext from "./NotesContext";
import AlertContext from "../Alert/AlertContext";
import ProgressContext from '../Progress/ProgressContext';
export default function NotesStates(props) {
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const context1 = useContext(ProgressContext);
  const { changeprogress, updateloading } = context1;
  const hostname = "https://inotebookbackendapp.herokuapp.com";
  const [notes, setnotes] = useState([]);
  const getNotes = async () => {
    //API
    const url = hostname + "/api/notes/getnotes";
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
        referrerPolicy: 'no-referrer',
      });
      changeprogress(70);
      const json = await response.json();
      changeprogress(90);
      if (json.success) {
        setnotes(json.notes);
      }
      else {
        showAlert(json.error, "danger");
      }
    }
    catch {
      showAlert("Internal Server Error", "danger");
    }
  }
  const addNotes = async (title, description, tag) => {
    //API
    updateloading(true);
    changeprogress(30);
    const url = hostname + "/api/notes/addnotes";
    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ title, description, tag })
      });
      changeprogress(70);
      const note = await response.json();
      changeprogress(80);
      //Client Side
      if (note.success) {
        setnotes(notes.concat(note.saved));
        changeprogress(100);
        updateloading(false);
        showAlert("Note added Successfully!", "success");
      }
      else {
        changeprogress(100);
        updateloading(false);
        showAlert(note.error.msg, "danger");
      }
    }
    catch {
      changeprogress(100);
      updateloading(false);
      showAlert("Internal Server Error", "danger");
    }
  }
  const updateNotes = async (notesid, title, description, tag) => {
    //API
    updateloading(true);
    changeprogress(30);
    const url = hostname + "/api/notes/updatenotes/" + notesid;
    if (tag === '') {
      tag = 'General';
    }
    try {
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ title, description, tag })
      });
      changeprogress(70);
      const json = await response.json();
      changeprogress(80);
      //Client Side
      if (json.success) {
        const newnotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < notes.length; index++) {
          if (newnotes[index]._id === notesid) {
            newnotes[index].title = title;
            newnotes[index].description = description;
            newnotes[index].tag = tag;
            break;
          }
        }
        changeprogress(90);
        setnotes(newnotes);
        changeprogress(100);
        updateloading(false);
        showAlert("Note updated Successfully!", "success");
      }
      else {
        changeprogress(100);
        updateloading(false);
        showAlert(json.error.msg, "danger");
      }
    }
    catch {
      changeprogress(100);
      updateloading(false);
      showAlert("Internal Server Error", "danger");
    }
  }
  const deleteNotes = async (notesid) => {
    //API
    let res = window.confirm("Are you sure you want to delete this note?");
    if (!res) {
      return;
    }
    updateloading(true);
    changeprogress(30);
    const url = hostname + "/api/notes/deletenotes/" + notesid;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });
      changeprogress(70);
      const json = await response.json();
      changeprogress(80);
      //Client Side
      if (json.success) {
        let newnotes = notes.filter((note) => { return note._id !== notesid });
        changeprogress(90);
        setnotes(newnotes);
        changeprogress(100);
        updateloading(false);
        showAlert("Note deleted Successfully!", "success");
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

  return (
    <NotesContext.Provider value={{ notes, addNotes, deleteNotes, updateNotes, getNotes }}>
      {props.children}
    </NotesContext.Provider>
  )
}
