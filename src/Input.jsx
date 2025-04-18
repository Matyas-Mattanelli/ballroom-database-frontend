import { useRef,useState } from "react";
import ColumnFilter from "./ColumnFilter";
import RowFilter from "./RowFilter";
import { CSSTransition } from "react-transition-group";

function Input({ searchHandler, columnFilterHandler, columnFilters, rowFilterHandler, rowFilters }) {
    // Initialize reference to the input for obtaining the input value upon clicking the submit button
    const inputRef = useRef();
    const advancedSearchRef = useRef();
    const columnFilterRef = useRef();
    const rowFilterRef = useRef();

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
                <div className="filter-button" onClick={() => setShowColumnFilter(!showColumnFilter)}>{showColumnFilter ? "Skrýt sloupcové filtry" : "Zobrazit sloupcové filtry"}</div>
                <CSSTransition classNames="fade-height" in={showColumnFilter} timeout={500} nodeRef={columnFilterRef} unmountOnExit mountOnEnter>
                    <ColumnFilter handler={columnFilterHandler} columnFilters={columnFilters} divRef={columnFilterRef}/>
                </CSSTransition>
            </div>
            <div className="filters">
                <div className="filter-button" onClick={() => setShowRowFilter(!showRowFilter)}>{showRowFilter ? "Skrýt řádkové filtry" : "Zobrazit řádkové filtry"}</div>
                <CSSTransition classNames="fade-height" in={showRowFilter} timeout={500} nodeRef={rowFilterRef} unmountOnExit mountOnEnter>
                    <RowFilter handler={rowFilterHandler} rowFilters={rowFilters} divRef={rowFilterRef}/>
                </CSSTransition>
            </div>
        </div>
    )
}

export default Input;