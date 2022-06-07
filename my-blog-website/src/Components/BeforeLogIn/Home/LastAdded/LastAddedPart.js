import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

function LastAddedPart({ id, to, header, body }) {
    return (
        <li key={id.toString()}>
            <Link to={to}>
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
export default LastAddedPart;