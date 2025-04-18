// Import the components
import Input from "./Input.jsx";
import OutputMsg from "./OutputMsg.jsx";
import Results from "./Results.jsx";

// Import react functions
import { useState } from "react";

// Import helper variables
import apiPath from "./assets/apiPath.js"
import { columns, uncheckedColumns } from "./assets/columns.js";

function App() {
  // Define setters and getters
  const [data, setData] = useState([]); // Data obtained from the API
  const [status, setStatus] = useState("start"); // Status of the search (either start - when the user opens the page, or search - when the search is performed, or found, not found, empty)
  const [input, setInput] = useState(""); // Input provided by the user
  
  // Initiate the default value for column filters
  const columnFiltersDefault = {};
  columns.forEach(col => {
    if (uncheckedColumns.indexOf(col) === -1) {
      columnFiltersDefault[col] = true;
    } else {
      columnFiltersDefault[col] = false;
    }
  })
  const [columnFilters, setColumnFilters] = useState(columnFiltersDefault); // Currently displayed columns

  // Initialize the default value for rowFilters
  const[rowFilters, setRowFilters] = useState({});

  // Define a function performing the search
  async function handleSearch(inputValue, isAdvanced, buttonDisabler) {
    // Specify the input
    setInput(inputValue);

    // Check the input
    if (inputValue === "") {
      setStatus("empty");
    } else {
      buttonDisabler(true); // Disable the button to prevent multiple api calls
      setStatus("search"); // Change the status to search

      // Specify query parameters
      let queryParams = "";
      if (isAdvanced) { // Specify adavanced search if required
        queryParams = queryParams + "?advanced=1"
      }

      // Define the request query
      let reqText;
      if (isNaN(inputValue)) { // If the input is not a number, assume it is a name and encode it
        reqText = `${apiPath}/name/${encodeURI(inputValue)}${queryParams}`;
      } else { // Otherwise assume it represents the IDT
        reqText = `${apiPath}/IDT/${inputValue}${queryParams}`;
      };

      // Get the response
      const response = await fetch(reqText);
      if (!response.ok) { // If the request was unsuccessfull, indicate that there was an error
        setStatus("error");
      } else {
        const responseJSON = await response.json() // Parse the response to json
        setData(responseJSON); // Set the data equal to the json response
        if (responseJSON.length === 0) {
          setStatus("not found");
          buttonDisabler(false); // Enable the button again
        } else {
          setStatus("found");
          buttonDisabler(false); // Enable the button again
        }
      }
    }
  }

  // Define a function updating the column filters
  function handleColumnFilters(col) {
    setColumnFilters({...columnFilters, [col]:!columnFilters[col]}); // Revert the value for the given column upon clicking
  }

  // Define a function updating the row filters
  function handleRowFilters(col) {
    setRowFilters({});
  }

  return (
    <>
      <img src="./src/assets/logo.png" id="logo" />
      <Input searchHandler={handleSearch} columnFilterHandler={handleColumnFilters} columnFilters={columnFilters} rowFilterHandler={handleRowFilters} rowFilters={rowFilters}/>
      <OutputMsg input={input} status={status} dataLength={data.length} />
      <Results data={data} columnFilters={columnFilters} />
    </>
  )
}

export default App;
