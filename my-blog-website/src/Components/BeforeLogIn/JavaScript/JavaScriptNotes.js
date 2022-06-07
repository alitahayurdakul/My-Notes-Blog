import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API } from '../../../API/Api';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import OtherNotesLink from '../OtherNotesLink/OtherNotesLink';
import PartNoteStructure from '../PartNoteStructure/PartNoteStructure';
import JavaScriptHeader from './Header/JavaScriptHeader';

function JavaScriptNotes() {
    const { javaScriptNotes, setJavaScriptNotes } = useState([]);

    useEffect(() => {

        const getJavaScriptNotes = async () => {
            await axios.get(API + "/notes/group-notes/javascript")
                .then(response => setJavaScriptNotes(response.data));
        }

        getJavaScriptNotes();

    }, [setJavaScriptNotes]);
    return (
        <>
            <Navbar />
            <div className='notes-part'>

                <JavaScriptHeader />

                <div className='notes-part-body'>
                    <div className='notes-part-left'>
                        <ul>
                            {
                                javaScriptNotes ? javaScriptNotes.map(note => (
                                    <PartNoteStructure to={note.url} header={note.headerName} body={note.shortExplaining} id={note._id} />
                                )) : <div>Herhangi bir not bulunmamaktadır.</div>
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
export default JavaScriptNotes;