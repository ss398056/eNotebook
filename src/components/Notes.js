import React, { useEffect } from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

function Notes() {
    const context = useContext(NoteContext);
    const {notes, getNotes} = context;
    
    useEffect(()=>{
        getNotes();
    },[])
    
    return (
        <>
        <AddNote/>
        <hr/>
        <div className='container'>
            <h2>Your Notes</h2>
            <div className='row'>
                {notes.map((note) => {
                    return <Noteitem note={note} key={note._id} />
                })}
            </div>
        </div>
        </>
    )
}

export default Notes
