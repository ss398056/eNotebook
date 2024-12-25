import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const [notes, setNotes] = useState([])
  const [id, setId] = useState('')
  const [token, setToken] = useState(sessionStorage.getItem('token'))

  //Get all notes
  const getNotes = async ()=>{
    try {
      const response = await fetch(`${host}/api/notes/getallnotes`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
      });
      const json = await response.json();
      //console.log(token);
      //console.log(json.notes);
      setNotes(json.notes);
    } catch (error) {
      console.error(error.message);
    }
  }

  //Add a note
  const addNote = async (note) => {
    //console.log(note)
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({title:note.title, description:note.description, tag:note.tag})
      });
      const json = await response.json();
      //console.log(json)
      setNotes(notes.concat(json))
    } catch (error) {
      console.error(error.message);
    }
    
  }

  //Edit a note
  const editNote = async (id, note) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({title:note.title, description:note.description, tag:note.tag}),
      });
      const json = await response.json();
      const newNotes = notes.filter((note) => { return note._id !== id });
      setNotes(newNotes.concat(json))

    } catch (error) {
      console.error(error.message);
    }

  }

  //Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes//deletenote/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        
      });
      const json = response.json();
      const newNotes = notes.filter((note) => { return note._id !== id });
      setNotes(newNotes)
    } catch (error) {
      console.error(error.message);
    }
    
  }

 const setNoteId = (eid)=>{
    setId(eid)
 }

  return (
    <NoteContext.Provider value={{id, notes, addNote, editNote, deleteNote, getNotes, setNoteId, token, setToken}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
