import { useRef,useState } from "react";
import ColumnFilter from "./ColumnFilter";
import RowFilter from "./RowFilter";

function Input({ searchHandler, columnFilterHandler, columnFilters }) {
    // Initialize reference to the input for obtaining the input value upon clicking the submit button
    const inputRef = useRef();
    const advancedSearchRef = useRef();

    // Initialize variables for showing/hiding the filters
    const [showColumnFilter, setShowColumnFilter] = useState(false);
    const [showRowFilter, setShowRowFilter] = useState(false);

    // Define a function handling the click event
    function handleClick() {
        searchHandler(inputRef.current.value, advancedSearchRef.current.checked);
    }

    return (
        <div className="input-container">
            <input type="text" placeholder="Zadejte jméno nebo IDT..." id="input" name="input" minLength="1" maxLength="50" ref={inputRef}></input>
            <div id="advanced-search-container">
                <input type="checkbox" name="advanced-search" id="advanced-search" className="checkbox" ref={advancedSearchRef}></input>
                <label htmlFor="advanced-search">Pokročilé vyhledávání</label>
            </div>
            <button type="button" id="submit" onClick={handleClick}>Vyhledat</button>
            <div className="filters">
                <div className="filter-button" onClick={() => setShowColumnFilter(!showColumnFilter)}>{showColumnFilter ? "Skrýt sloupcové filtry" : "Ukázat sloupcové filtry"}</div>
                <ColumnFilter show={showColumnFilter} handler={columnFilterHandler} columnFilters={columnFilters} />
            </div>
            <div className="filters">
                <div className="filter-button" onClick={() => setShowRowFilter(!showRowFilter)}>{showRowFilter ? "Skrýt řádkové filtry" : "Ukázat řádkové filtry"}</div>
                <RowFilter show={showRowFilter} />
            </div>
        </div>
    )
}

export default Input;