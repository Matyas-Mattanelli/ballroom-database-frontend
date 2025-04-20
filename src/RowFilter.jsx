import { filterRowColumns } from "./assets/columns.js";
import RowFilterValues from "./RowFilterValues.jsx";
import { useState } from "react";

function RowFilter({ handler, rowFilters, divRef, rowFilterShown, setRowFilterShown, resetRowFilters }) {
    // Define a state for storing the position of the currently viewed row filter element
    const [position, setPosition] = useState({ top: 0, left: 0 })

    // Calculate the number of rows for the table with filters
    const nCols = 4; // Fix the number of columns to 4

    // Separate the columns into chunks containing values for each row
    const rows = [];
    for (let i = 0; i < filterRowColumns.length; i += nCols) {
        rows.push(filterRowColumns.slice(i, i + nCols));
    }

    // Define a function handling the showing/hiding of options
    function handleRowFilterColumnClick(event, col) {
        // Hide options if shown
        if (rowFilterShown === col) {
            setRowFilterShown(null);

        // Show options if not shown
        } else {
            // Update the position of the current element
            const rect = event.target.getBoundingClientRect(); // Get the position of the current element
            setPosition({top: rect.bottom + window.scrollY, left: rect.left + window.scrollX});

            // Set the column whose options are to be shown
            setRowFilterShown(col);
        }
    }

    // Build the element
    return (
        <div className="filter-container" ref={divRef}>
            <table className="filter-table">
                <tbody>
                    {rows.map((row, idxRow) => {
                        return (
                            <tr key={idxRow}>
                                {row.map((col, idxCol) => {
                                    return (
                                        <td key={idxCol} className="row-filter-column" onClick={(e) => handleRowFilterColumnClick(e, col)}>{col}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button type="button" className="red-btn" onClick={resetRowFilters}>Smazat řádkové filtry</button>
            <RowFilterValues valDict={rowFilters[rowFilterShown]} handler={handler} col={rowFilterShown} position={position} />
        </div>
    )
}

export default RowFilter;