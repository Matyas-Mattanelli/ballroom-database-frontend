import { columns } from "./assets/columns.js";

function ColumnFilter({ handler, columnFilters, divRef }) {
    // Calculate the number of rows for the table with filters
    const nCols = 4; // Fix the number of columns to 4

    // Separate the columns into chunks containing values for each row
    const rows = [];
    for (let i = 0; i < columns.length; i += nCols) {
        rows.push(columns.slice(i, i + nCols));
    }

    // Build the element
    return (
        <div className="column-filter-container" ref={divRef}>
            <table className="column-filter-table">
                <tbody>
                    {rows.map((row, idxRow) => {
                        return (
                            <tr key={idxRow}>
                                {row.map((col, idxCol) => {
                                    return (
                                        <td key={idxCol} onClick={() => handler(col)}>{columnFilters[col] ? col + " \u2705" : col}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ColumnFilter;