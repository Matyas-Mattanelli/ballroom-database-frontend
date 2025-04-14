import { columns } from "./assets/columns.js";
import TableRow from "./TableRow.jsx";

function Results({ data }) {
    // If no data is returned, do not render anything
    if (data.length === 0) {
        return (<></>)
    } else {
        return (
            <table className="results-table">
                <thead>
                    <TableRow rowData={columns} isHeader={true} />
                </thead>
                <tbody>
                    {data.map((row, idx) => {
                        return(
                            <TableRow rowData={row} key={idx}/>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

export default Results;