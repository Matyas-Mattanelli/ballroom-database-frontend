import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

// Component representing a single cell in a table
function TableCell({val, show, isHeader}) {
    // Create a reference for a css transition
    const cellRef = useRef();

    // Return a header element if required
    if (isHeader) {
        return (
            <CSSTransition classNames="fade-width" in={show} timeout={1000} nodeRef={cellRef} unmountOnExit mountOnEnter>
                <th ref={cellRef}>{val}</th>
            </CSSTransition>
        )
    } else {
        return (
            <CSSTransition classNames="fade-width" in={show} timeout={1000} nodeRef={cellRef} unmountOnExit mountOnEnter>
                <td ref={cellRef}>{val}</td>
            </CSSTransition>
        )
    }
}

export default TableCell;