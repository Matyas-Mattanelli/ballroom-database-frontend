import { columns } from "./assets/columns.js";
import TableRow from "./TableRow.jsx";

function Results({ data, columnFilters, rowFilters }) {
    // If no data is returned, do not render anything
    if (data.length === 0) {
        return (<></>)
    } else {
        return (
            <div className="results-table-container">
                <table className="results-table">
                    <thead>
                        <TableRow rowData={columns} isHeader={true} columnFilters={columnFilters} />
                    </thead>
                    <tbody>
                        {data.map((row, idx) => {
                            return (
                                <TableRow rowData={row} key={idx} columnFilters={columnFilters} rowFilters={rowFilters} />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Results;