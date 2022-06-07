import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import EnglishWordUpdateBody from './EnglishWordUpdateBody';

function EnglishWordUpdate() {
    let { id }=useParams();

  return (
    <>
    <Navbar/>
    <EnglishWordUpdateBody wordId={id} />
    </>
  )
}
export default EnglishWordUpdate;