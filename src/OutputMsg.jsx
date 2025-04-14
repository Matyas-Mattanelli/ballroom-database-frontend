function OutputMsg({ input, status, dataLength }) {
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
            outputMsg = `Zobrazuji ${dataLength} výsledků pro ${input}`;
            break;
    }
    return (
        <div id='output-msg'>{outputMsg}</div>
    )
}

export default OutputMsg;