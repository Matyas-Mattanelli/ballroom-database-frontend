// Component representing a single row in a table
function TableRow({ rowData, isHeader = false }) {
    if (isHeader) {
        return (
            <tr>
                {rowData.map((val, idx) => {
                    return (
                        <th key={idx}>{val}</th>
                    )
                })}
            </tr>
        )    
    } else {
        return (
            <tr>
                {rowData.map((val, idx) => {
                    return (
                        <td key={idx}>{val}</td>
                    )
                })}
            </tr>
        )
    }
}

export default TableRow;