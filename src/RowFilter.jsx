import { columns } from "./assets/columns.js";

function RowFilter({show}) {
    if (show) {
        return (
        <div>Řádkový filtr</div>
        )
    } else {
        return (<></>)
    }
}

export default RowFilter;