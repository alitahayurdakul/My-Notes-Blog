import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import NoteUpdateBody from './NoteUpdateBody';

function NotesUpdate() {
  let { id } = useParams();
  return (
    <>
      <Navbar />
      <NoteUpdateBody noteId={id} />
    </>
  )
}
export default NotesUpdate;
