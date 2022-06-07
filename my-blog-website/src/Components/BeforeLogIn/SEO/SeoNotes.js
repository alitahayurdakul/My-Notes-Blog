import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API } from '../../../API/Api';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import OtherNotesLink from '../OtherNotesLink/OtherNotesLink';
import PartNoteStructure from '../PartNoteStructure/PartNoteStructure';
import SeoHeader from './Header/SeoHeader';

function Seo() {
  const {seoNotes, setSeoNotes} = useState([]);

  useEffect(()=>{

    const getSeoNotes = async() =>{
      await axios.get(API + "/notes/group-notes/seo")
      .then(response => setSeoNotes(response.data));
    }

    getSeoNotes();

  },[setSeoNotes]);

  return (
    <>
      <Navbar />
      <div className='notes-part'>

        <SeoHeader />

        <div className='notes-part-body'>
          <div className='notes-part-left'>
            <ul>
              {
                seoNotes ? seoNotes.map(note => (
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
export default Seo;