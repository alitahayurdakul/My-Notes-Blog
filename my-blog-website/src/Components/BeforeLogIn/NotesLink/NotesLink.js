import React from 'react'
import { Link } from 'react-router-dom'

function NotesLink({key, to, body}) {
    return (
        <li key={key} data-testid="notes-link">
            <Link to={to} data-testid="notes-link-part" title={body}>
                <span>{body}</span>
                <i className="fas fa-chevron-right fa-sm" />
            </Link>
        </li>
    )
}
export default NotesLink;