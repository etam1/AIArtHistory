import { useState, useRef, useEffect } from "react";

export default function StickyNote({ onClose }) {
    const [allowMove, setAllowMove] = useState(false);
    const stickyNoteRef = useRef();
    const [dx, setDx] = useState(0);
    const [dy, setDy] = useState(0);

    function handleMouseDown(e) {
        setAllowMove(true);
        const dimensions = stickyNoteRef.current.getBoundingClientRect();
        setDx(e.clientX - dimensions.x);
        setDy(e.clientY - dimensions.y);
    }

    function handleMouseMove(e) {
        if (allowMove) {
            const x = e.clientX - dx;
            const y = e.clientY - dy;
            stickyNoteRef.current.style.left = `${x}px`;
            stickyNoteRef.current.style.top = `${y}px`;
        }
    }

    function handleMouseUp() {
        setAllowMove(false);
    }

    useEffect(() => {
        // Attach mouse move and mouse up listeners to the document
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        // Cleanup event listeners on component unmount
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    });

    return (
        <div
            className="sticky-note"
            ref={stickyNoteRef}
            style={{ position: "absolute", zIndex: 10 }}
        >
            <div
                className="sticky-note-header"
                onMouseDown={handleMouseDown}
            >
                <div>Sticky Note</div>
                <div className="close" onClick={onClose}>
                    &times;
                </div>
            </div>
            <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
    );
}


