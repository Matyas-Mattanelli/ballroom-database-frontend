import { columns } from "./assets/columns";

function OutputMsg({ input, status, data, rowFilters }) {
    // Initialize the output message
    let outputMsg;

    switch (status) {
        // If no search was performed, do not show any message
        case "start":
            return (<></>);

        // If the user clicked the button without specifying anything
        case "empty":
            outputMsg = `Vyhledávací pole je prázdné`;
            break;

        // Search mode
        case "search":
            outputMsg = `Vyhledávám výsledky pro ${input}...`;
            break;

        // Error
        case "error":
            outputMsg = `Pří vyhledávání výsledků pro ${input} se vyskytla neznámá chyba`;
            break;

        // If the API did not return any data
        case "not found":
            outputMsg = `Výsledky pro ${input} nebyly nalezeny`;
            break;

        // If the API found the data
        case "found":
            // Calculate the number of currently displayed rows
            let rowsShown = 0;
            data.forEach(row => {
                // Loop through the data and check that all values within a row are to be displayed
                let add = true;
                for (let idx = 0; idx < row.length; idx++) {
                    // If a filtered value is encountered do not increase the count
                    if (rowFilters[columns[idx]][row[idx]] === false) {
                        add = false;
                        break;
                    }
                }

                // Increment the count if all values are to be displayed
                if (add) {
                    rowsShown++;
                }
            })
            
            // Define the output message
            outputMsg = `Zobrazuji ${rowsShown} výsledků pro ${input}`;
            break;
    }
    return (
        <div id='output-msg'>{outputMsg}</div>
    )
}

export default OutputMsg;