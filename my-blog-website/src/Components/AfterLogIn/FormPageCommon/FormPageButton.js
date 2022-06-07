import React from 'react'

function FormPageButton({ buttonName }) {
    return (
        <div className="btn-block">
            <button type="submit">{buttonName}</button>
        </div>
    )
}
export default FormPageButton;