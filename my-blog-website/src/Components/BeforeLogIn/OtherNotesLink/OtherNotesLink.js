import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API } from '../../../API/Api';
import NotesLink from '../NotesLink/NotesLink'


function OtherNotesLink() {
    const [otherNotes, setOtherNotes] = useState([]);

    useEffect(()=>{

        const getOtherNotes = async() =>{
            await axios.get(API + "/notes/list")
            .then(response => {
                let lastAddedNotes = [];
                
                // for(let i = 0; i <= 3; i++){
                //     lastAddedNotes.push(response.data[i])
                // }

                setOtherNotes(lastAddedNotes);
            })
        }
        
        getOtherNotes();
    },[]);

    return (
        <div className='notes-part-right' data-testid="other-notes-link">
            <h4 className='text-center'>Şu Notlara da Gözat</h4>
            <ul>
                {otherNotes.map(note => (
                    <NotesLink to={"/" + note.parentHeader + "/" + note.url } body={note.shortExplaining} />
                ))}
            </ul>
        </div>
    )
}

export default OtherNotesLink;