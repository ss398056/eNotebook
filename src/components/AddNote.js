import React, {useContext, useEffect, useState} from 'react'
import NoteContext from '../context/notes/noteContext';
import AlertContext  from '../context/notes/alertContext';

function AddNote(props) {
    const context = useContext(NoteContext);
    const {id, setNoteId, notes, addNote, editNote} = context;
    const [note, setNote] = useState({
        title : "",
        description : "",
        tag : "personal"
    });
    const alertContext = useContext(AlertContext);
    const {showAlert} = alertContext;
    //this use for get edit data from database
    useEffect(() => {
        // Find the note to edit
        const noteToEdit = notes.find((note) => note._id === id);

        if (noteToEdit) {
            // Only update state if the values differ
            setNote((prevNote) =>
                prevNote.title !== noteToEdit.title ||
                prevNote.description !== noteToEdit.description ||
                prevNote.tag !== noteToEdit.tag
                    ? {
                          title: noteToEdit.title,
                          description: noteToEdit.description,
                          tag: noteToEdit.tag,
                      }
                    : prevNote
            );
        } else {
            // Reset state for a new note
            setNote((prevNote) =>
                prevNote.title !== '' ||
                prevNote.description !== '' ||
                prevNote.tag !== 'personal'
                    ? {
                          title: '',
                          description: '',
                          tag: 'personal',
                      }
                    : prevNote
            );
        }
    }, [id, notes]); // Depend only on id and notes

    const handleAddNoteClick = (e)=>{
        e.preventDefault();
        if(note.title!=='' && note.title.length>3){
            addNote(note)
            showAlert("Note added successfully","success")
        }else{
            showAlert("title should not be blank or less then 3 characters","danger")
        }
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }

    const handleEditNoteClick = (id)=>{
        //console.log("Edit working...")
        if(note.title!=='' && note.title.length>3){
            editNote(id,note)
            setNoteId('')
            showAlert("note updated successfully","success")
        }else{

            showAlert("title should not be blank or less then 3 characters","danger")
        }
        
    }

    return (
        <>
            <div className='container'>
                <h2 className='h2 mt-3'>{!id?'Add a note':'Edit a note'}</h2>
                <div className="mb-3">
                    <label className="form-label">Note Title</label>
                    <input type="text" className="form-control" id="title" name="title" placeholder="Enter a title" onChange={onChange} value={note.title} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter a tag" onChange={onChange} value={note.tag} />
                </div>
                <div className="mb-3">
                    <textarea className="form-control" id="description" name="description" rows="8" placeholder='Write a note' onChange={onChange} value={note.description}></textarea>
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" onClick={!id?handleAddNoteClick: ()=>handleEditNoteClick(id)}>{!id?'Add Note':'Edit Note'}</button>
                </div>
            </div>
        </>
    )
}

export default AddNote
