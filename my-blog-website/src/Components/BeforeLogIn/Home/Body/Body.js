import React from 'react'
import NotesLink from '../../NotesLink/NotesLink';
import AboutMe from './AboutMe/AboutMe';

export default function Body() {
  return (
    <div className="home-body">
      <div className="home-body-part">
        <ul>
          <NotesLink to="react" body="React Notları" key={1}/>
          <NotesLink to="nodejs" body="Node.Js Notları" key={2}/>
          <NotesLink to="javascript" body="JavaScript Notları" key={3}/>
          <NotesLink to="react-native" body="React Native Notları" key={4}/>
          <NotesLink to="seo" body="SEO Notları" key={5}/>
        </ul>
      </div>

      <AboutMe />
    </div>
  )
}
