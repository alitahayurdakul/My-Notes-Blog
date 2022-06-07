import React from 'react'
import { Link } from 'react-router-dom';

function PartNoteStructure({id, to, header, body}) {
    return (
        <li key={id}>
            <Link to={to} data-testid="note-structure-link" title={header}>
                <span>
                    {header}
                </span>
                <p>
                    {body}
                </p>
            </Link>
        </li>
    )
}
export default PartNoteStructure;