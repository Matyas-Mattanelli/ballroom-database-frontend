import { columns } from "./assets/columns.js";
import TableCell from "./TableCell.jsx";

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
function TableRow({ rowData, columnFilters, isHeader = false }) {
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
    } else {
        return (
            <tr onClick={() => openCompetitionResults(rowData[columns.indexOf('ID eventu')], rowData[columns.indexOf('ID soutěže')], Number(rowData[columns.indexOf('Datum')].slice(0, 4)))}>
                {rowData.map((val, idx) => {
                    return (
                        <TableCell key={idx} show={columnFilters[columns[idx]]} val={val} isHeader={false}/>
                    )
                })}
            </tr>
        )
    }
}

export default TableRow;