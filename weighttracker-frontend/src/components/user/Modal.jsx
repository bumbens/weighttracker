import "../css/modal.css"

import { createPortal } from 'react-dom'

function UpdateUser({isOpen, onClose, children}) {
    if (!isOpen) return null

    return createPortal(
        <div className="overlay">
            <div className="modal" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    )
}

export default UpdateUser