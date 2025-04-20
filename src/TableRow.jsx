import { columns } from "./assets/columns.js";
import TableCell from "./TableCell.jsx";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

// Define a function opening a window with the competition results
function openCompetitionResults(eventId, compId, year) {
    let link;
    if (year < 2018) { // Yellow website
        link = `https://www.csts.cz/cs/VysledkySoutezi/Soutez/${compId}`;
    } else { // Blue website
        link = `https://www.csts.cz/dancesport/vysledky_soutezi/event/${eventId}/competition/${compId}`;
    }
    window.open(link, "_blank"); // Open a new tab with the competition results
}

// Component representing a single row in a table
function TableRow({ rowData, columnFilters, rowFilters, isHeader = false }) {
    // Define a reference to allow for transitions 
    const rowRef = useRef();

    // Handle headers
    if (isHeader) {
        return (
            <tr>
                {rowData.map((val, idx) => {
                    return (
                        <TableCell key={idx} show={columnFilters[columns[idx]]} val={val} isHeader={true}/>
                    )
                })}
            </tr>
        )

    // Handle body
    } else {
        // Check whether the row can be shown
        let shown = true;
        for (let idx = 0; idx < rowData.length; idx++) {
            // If a filtered value is encountered do not show the row
            if (rowFilters[columns[idx]][rowData[idx]] === false) {
                shown = false;
                break;
            }
        }

        // If the row can be shown, show it
        return (
            <CSSTransition classNames="fade-height" in={shown} timeout={500} nodeRef={rowRef} unmountOnExit mountOnEnter>
                <tr onClick={() => openCompetitionResults(rowData[columns.indexOf('ID eventu')], rowData[columns.indexOf('ID soutěže')], Number(rowData[columns.indexOf('Datum')].slice(0, 4)))} ref={rowRef}>
                    {rowData.map((val, idx) => {
                        return (
                            <TableCell key={idx} show={columnFilters[columns[idx]]} val={val} isHeader={false}/>
                        )
                    })}
                </tr>
            </CSSTransition>
        )
    }
}

export default TableRow;