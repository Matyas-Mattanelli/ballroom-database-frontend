function Input() {
    return (
        <div className="input-container">
            <input type="text" placeholder="Zadejte jméno nebo IDT" id="input" name="input" minLength="1" maxLength="50"></input>
            <div>
                <input type="checkbox" name="advanced-search" id="advanced-search" value="advanced-search"></input>
                <label for="advanced-search">Pokročilé vyhledávání</label>
            </div>
            <button type="button" id="submit">Vyhledat</button>
            <p></p>
        </div>
    )
}

export default Input