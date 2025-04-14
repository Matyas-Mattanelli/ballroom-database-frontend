import { useRef } from "react";

function Input({ searchHandler }) {
    // Initialize reference to the input for obtaining the input value upon clicking the submit button
    const inputRef = useRef();
    const advancedSearchRef = useRef();

    // Define a function handling the click event
    function handleClick() {
        searchHandler(inputRef.current.value, advancedSearchRef.current.checked);
    }

    return (
        <div className="input-container">
            <input type="text" placeholder="Zadejte jméno nebo IDT..." id="input" name="input" minLength="1" maxLength="50" ref={inputRef}></input>
            <div>
                <input type="checkbox" name="advanced-search" id="advanced-search" value="advanced-search" ref={advancedSearchRef}></input>
                <label htmlFor="advanced-search">Pokročilé vyhledávání</label>
            </div>
            <button type="button" id="submit" onClick={handleClick}>Vyhledat</button>
        </div>
    )
}

export default Input;