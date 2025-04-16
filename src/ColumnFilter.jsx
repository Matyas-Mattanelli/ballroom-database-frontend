import { columns } from "./assets/columns.js";

function ColumnFilter({ show, handler, columnFilters }) {
    if (show) {
        // Calculate the number of rows for the table with filters
        const nCols = 4; // Fix the number of columns to 4
        const nRows = Math.ceil(columns.length / 4); // Calculate the required number of rows

        // Separate the columns into chunks containing values for each row
        const rows = [];
        for (let i = 0; i < columns.length; i += nCols) {
            rows.push(columns.slice(i, i + nCols));
        }

        // Build the element
        return (
            <div className="column-filter-container">
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
    } else {
        return (<></>)
    }
}

export default ColumnFilter;