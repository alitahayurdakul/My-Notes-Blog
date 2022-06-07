import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import OtherNotesLink from '../OtherNotesLink/OtherNotesLink';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API } from '../../../API/Api';


function NotePage() {
    const [note, setNote] = useState();

    let { url } = useParams();

    useEffect(() => {
        const getNote = async () => {
            await axios.get(API + `/notes/detail-by-url/${url}`)
                .then(response => {
                    setNote(response.data)
                })
                // .catch(() => {

                // })
        }

        getNote();
    }, [url]);

    return (
        <>
            <Navbar />
            <div className='notes-part'>
                <div className='notes-part-body'>
                    {
                        note ? <div className='notes-part-left'>
                        <h3>{note.headerName}</h3>
                        <p className='mb-2'>
                            <i className="fas fa-calendar-alt me-2" />
                            {note.date.split("-").reverse().join("-")}
                        </p>

                        {parse(`${note.content}`)}
                    </div>: <div>YÜKLENİYOR...</div>
                    }
                    

                    <OtherNotesLink />
                </div>
            </div>
            <Footer />
        </>
    )
}
export default NotePage;