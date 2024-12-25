import React,{useContext} from 'react'
import NoteContext from '../context/notes/noteContext';
import AlertContext from '../context/notes/alertContext';

function Noteitem(props) {
    const context = useContext(NoteContext);
    const {setNoteId, deleteNote} = context;
    const { note } = props;
    const alertContext = useContext(AlertContext);
    const {showAlert} = alertContext;
    const handleEditClick = (eid)=>{
        //console.log("edit click working..")
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scrolling
        });
        //console.log(eid)
        setNoteId(eid)
    }

    const handleDeleteClick = (id)=>{
        deleteNote(id)
        showAlert('Note deleted successfully','danger')
        setNoteId('')
    }
    const date = new Date(note.date);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short', // or 'short' or '2-digit'
        day: '2-digit',
        weekday: 'short', // or 'short'
    });
    
    return (
        <>
            <div className="card my-2 mx-3 col-md-3">
                <div className="card-header d-flex">
                    <span>{note.tag}</span>
                    <div style={{marginLeft:'100px'}}>
                        <i className="fas fa-edit mx-2" onClick={()=>handleEditClick(note._id)} ></i>
                        <i className="fas fa-trash-alt mx-2" onClick={()=>handleDeleteClick(note._id)} ></i>
                    </div>
                    
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>{note.title}</p>
                        <footer className="blockquote-footer">{note.description}</footer>
                        
                    </blockquote>
                    <p>Added on {formattedDate}</p>
                </div>
            </div>
            
        </>
    )
}

export default Noteitem
