import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API } from '../../../API/Api';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import OtherNotesLink from '../OtherNotesLink/OtherNotesLink';
import PartNoteStructure from '../PartNoteStructure/PartNoteStructure';
import NodeJsHeader from './Header/Header';

function NodeJSNotes() {

    const {nodeJSNotes, setNodeJSNotes} = useState([]);

    useEffect(()=>{
        const getNodeJsNotes = async() => {
            await axios.get(API + "/notes/group-notes/nodejs")
            .then(response => setNodeJSNotes(response.data))
            .catch(()=>{

            })
        }
        getNodeJsNotes()
    },[setNodeJSNotes])
    return (
        <>
            <Navbar />
            <div className='notes-part'>

                <NodeJsHeader />

                <div className='notes-part-body'>
                    <div className='notes-part-left'>
                        <ul>
                            {
                                nodeJSNotes ? nodeJSNotes.map(note => (
                                    <PartNoteStructure to={note.url} header={note.headerName} body={note.shortExplaining} id={note._id} />
                                )): <div>Herhangi bir not bulunmamaktadır.</div>
                            }

                        </ul>
                    </div>

                    <OtherNotesLink />
                </div>
            </div>
            <Footer />
        </>
    )
}
export default NodeJSNotes;